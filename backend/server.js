require('dotenv').config(); // Charge les variables d'environnement en premier
const express = require('express');
require('dotenv').config()
const cors = require('cors');
const connectDB = require('./lib/mongodb'); // Importe votre fonction de connexion
const Product = require('./models/Product'); // Importe votre modèle
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// 1. Connexion à la Base de Données
connectDB();

// 2. Middlewares
app.use(cors()); // Autorise le frontend Next.js à communiquer avec le backend
app.use(express.json()); // Permet de lire le corps des requêtes JSON (req.body)


const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * POST : Créer un nouveau produit
 */
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    
    // req.file contains the info of the uploaded image
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image: imagePath // Save the URL path in MongoDB
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error saving product" });
  }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    let updateData = { name, price, category, description };

    // Si une nouvelle image est téléchargée, on met à jour le chemin
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
      
      // OPTIONNEL : Supprimer l'ancienne image du serveur pour gagner de l'espace
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct && oldProduct.image) {
        const oldPath = path.join(__dirname, oldProduct.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Retourne le produit modifié
    );

    if (!updatedProduct) return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
});

/**
 * DELETE : Supprimer un produit
 */
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });

    // Supprimer le fichier image du dossier 'uploads'
    // if (product.image) {
    //   const imagePath = path.join(__dirname, product.image);
    //   if (fs.existsSync(imagePath)) {
    //     fs.unlinkSync(imagePath);
    //   }
    // }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Produit et image supprimés avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
});

// 4. Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur : http://localhost:${PORT}`);
});
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

// 3. ROUTES API

// Create 'uploads' folder if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// 1. Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    // Rename file to avoid duplicates: timestamp-originalname
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// 2. Serve the 'uploads' folder statically so the frontend can see the images
app.use('/uploads', express.static('uploads'));

/**
 * GET : Récupérer tous les produits
 */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Récupère et trie par date (plus récent)
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

// 4. Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur : http://localhost:${PORT}`);
});
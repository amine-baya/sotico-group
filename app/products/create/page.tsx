"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function CreateProduct() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Construction',
    description: '' // Déjà initialisé dans votre état [cite: 83]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Utilisation de FormData pour gérer les fichiers et le texte [cite: 90]
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description); // Envoi de la description au backend
    if (file) data.append('image', file); 

    try {
      const response = await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        alert("Produit créé avec succès !");
        router.push('/products');
      }
    } catch (error: any) {
      console.error("Erreur lors de l'envoi:", error);
      alert("Erreur lors de la création du produit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <Link href="/products" className="text-sm text-gray-500 hover:underline">Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Nom du produit */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Ex: Combinaison de protection"
              onChange={handleChange} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Prix */}
            <div>
              <label className="block text-sm font-medium mb-2">Price (TND)</label>
              <input 
                type="text" 
                name="price" 
                required 
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="0.00"
                onChange={handleChange} 
              />
            </div>
            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                name="category" 
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={handleChange}
              >
                <option value="Construction">Construction</option>
                <option value="Tennis">Tennis</option>
                <option value="Industrial">Industrial</option>
                <option value="Safety">Safety</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* AJOUT : Champ Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Détails sur la tenue (matière, durabilité, usage...)"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Image du produit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
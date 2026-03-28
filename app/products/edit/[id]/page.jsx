"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Construction',
    description: ''
  });

  // Charger les données actuelles
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        const product = response.data.find((p) => p._id === id);
        
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description || ''
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur:", error);
        router.push('/products');
      }
    };
    fetchProduct();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Envoi direct de l'objet JSON (sans FormData car pas d'image ici)
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData);

      if (response.status === 200) {
        alert("Attributs mis à jour !");
        router.push('/products');
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  if (loading) return <div className="p-10 text-center">Chargement des données...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Modifier les informations</h1>
          <Link href="/products" className="text-blue-600 hover:underline text-sm">Annuler</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium mb-2">Désignation</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              required 
              className="w-full px-4 py-2 border rounded-xl outline-none focus:border-blue-500" 
              onChange={handleChange} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Prix */}
            <div>
              <label className="block text-sm font-medium mb-2">Prix (TND)</label>
              <input 
                type="text" 
                name="price" 
                value={formData.price}
                required 
                className="w-full px-4 py-2 border rounded-xl outline-none focus:border-blue-500" 
                onChange={handleChange} 
              />
            </div>
            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <select 
                name="category" 
                value={formData.category}
                className="w-full px-4 py-2 border rounded-xl outline-none focus:border-blue-500" 
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description technique</label>
            <textarea
              name="description"
              value={formData.description}
              rows={4}
              className="w-full px-4 py-2 border rounded-xl outline-none focus:border-blue-500"
              onChange={handleChange}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../components/Header';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react'; // Import des icônes

interface Product {
  _id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Construction', 'Tennis', 'Industrial', 'Safety', 'Other'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      applyFilter(response.data, activeCategory || 'All');
    } catch (error) {
      console.error("Erreur chargement produits:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (allProducts: Product[], category: string) => {
    if (category === 'All') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === category));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      applyFilter(products, categoryFromUrl);
    }
  }, [categoryFromUrl, products]);

  // Fonction de suppression (Action DELETE)
  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette tenue ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        // Mise à jour de l'état local après suppression réussie
        setProducts(prev => prev.filter(p => p._id !== id));
        setFilteredProducts(prev => prev.filter(p => p._id !== id));
        alert("Produit supprimé avec succès");
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Catalogue</h1>
          <p className="text-gray-500">Manage your workwear collection</p>
        </div>
        <Link href="/products/create" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg">
          + Add Product
        </Link>
      </div>

      {/* Filtres ... (garder votre code actuel pour les boutons de catégorie) */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group relative bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all p-4 flex flex-col">
              
              {/* Boutons d'action (Flottants sur l'image au hover) */}
              <div className="absolute top-6 right-6 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  href={`/products/edit/${product._id}`}
                  className="p-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50 transition"
                  title="Modifier"
                >
                  <Pencil size={18} />
                </Link>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="p-2 bg-white text-red-600 rounded-full shadow-md hover:bg-red-50 transition"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="relative h-48 w-full mb-4 overflow-hidden rounded-2xl">
                <img
                  src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-amber-600 font-bold mb-2">{product.price} TND</p>
              
              <Link
                href={`/products/${product._id}`}
                className="mt-auto text-center py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
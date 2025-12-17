"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '../components/Header';
import Link from 'next/link';

// Interface pour TypeScript
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
  const categoryFromUrl = searchParams.get('category'); // Récupère le ?category=...

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Construction', 'Tennis', 'Industrial', 'Safety', 'Other'];

  // 1. Charger les produits depuis le serveur Node.js
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);

        // Si une catégorie est présente dans l'URL, on filtre immédiatement
        if (categoryFromUrl) {
          setActiveCategory(categoryFromUrl);
          const filtered = response.data.filter((p: Product) => p.category === categoryFromUrl);
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFromUrl]);

  // 2. Fonction pour changer de catégorie manuellement
  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barre de titre et bouton Create */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Catalogue</h1>
          <p className="text-gray-500">Discover our professional equipment</p>
        </div>
        
        <Link 
          href="/products/create" 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          + Add Product
        </Link>
      </div>

      {/* Filtres de catégories */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Affichage du contenu */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col"
              >
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm">
                    {product.category}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-amber-600 font-bold text-xl mb-2">{product.price} <span className="text-sm">TND</span></p>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                <Link
                  href={`/products/${product._id}`}
                  className="w-full text-center py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Message si vide */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg italic">No products found in this category.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Composant principal avec Suspense pour Next.js 13/14+
export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Suspense fallback={<div className="text-center py-20">Loading page...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
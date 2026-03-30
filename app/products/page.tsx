"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import Header from "../components/Header";
import { useLanguage } from "../components/providers/LanguageProvider";

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
  const { t } = useLanguage();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      applyFilter(response.data, activeCategory || "All");
    } catch (error) {
      console.error(t.products.fetchError, error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (allProducts: Product[], category: string) => {
    if (category === "All") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter((product) => product.category === category));
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      applyFilter(products, categoryFromUrl);
    }
  }, [categoryFromUrl, products]);

  const handleDelete = async (id: string) => {
    if (confirm(t.products.deleteConfirm)) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts((prev) => prev.filter((product) => product._id !== id));
        setFilteredProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
        alert(t.products.deleteSuccess);
      } catch (error) {
        console.error(error);
        alert(t.products.deleteError);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t.products.catalogueTitle}
          </h1>
          <p className="text-gray-500">{t.products.catalogueSubtitle}</p>
        </div>
        <Link
          href="/products/create"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          + {t.products.addProduct}
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="absolute right-6 top-6 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  href={`/products/edit/${product._id}`}
                  className="rounded-full bg-white p-2 text-blue-600 shadow-md transition hover:bg-blue-50"
                  title={t.products.edit}
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="rounded-full bg-white p-2 text-red-600 shadow-md transition hover:bg-red-50"
                  title={t.products.delete}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:5000${product.image}`
                  }
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="mb-2 font-bold text-amber-600">
                {product.price} TND
              </p>

              <Link
                href={`/products/${product._id}`}
                className="mt-auto rounded-xl bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-black"
              >
                {t.products.viewDetails}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div>{t.products.loading}</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}

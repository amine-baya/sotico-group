"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { useLanguage } from "@/app/components/providers/LanguageProvider";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Construction",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const product = response.data.find((item) => item._id === id);

        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description || "",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        router.push("/products");
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        formData
      );

      if (response.status === 200) {
        alert(t.products.editPage.success);
        router.push("/products");
      }
    } catch (error) {
      console.error(error);
      alert(t.products.editPage.error);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">{t.products.editPage.loading}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {t.products.editPage.title}
          </h1>
          <Link href="/products" className="text-sm text-blue-600 hover:underline">
            {t.products.editPage.cancel}
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.products.editPage.name}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              className="w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t.products.editPage.price}
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                required
                className="w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t.products.editPage.category}
              </label>
              <select
                name="category"
                value={formData.category}
                className="w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
                onChange={handleChange}
              >
                {t.products.categories
                  .filter((item) => item.value !== "All")
                  .map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.products.editPage.description}
            </label>
            <textarea
              name="description"
              value={formData.description}
              rows={4}
              className="w-full rounded-xl border px-4 py-2 outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg transition hover:bg-blue-700"
          >
            {t.products.editPage.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

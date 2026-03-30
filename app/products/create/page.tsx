"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { useLanguage } from "@/app/components/providers/LanguageProvider";

export default function CreateProduct() {
  const router = useRouter();
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Construction",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);

    if (file) {
      data.append("image", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert(t.products.create.success);
        router.push("/products");
      }
    } catch (error: unknown) {
      console.error(t.products.create.error, error);
      alert(t.products.create.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {t.products.create.title}
          </h1>
          <Link href="/products" className="text-sm text-gray-500 hover:underline">
            {t.products.create.back}
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.products.create.name}
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.products.create.placeholders.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t.products.create.price}
              </label>
              <input
                type="text"
                name="price"
                required
                className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.products.create.placeholders.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                {t.products.create.category}
              </label>
              <select
                name="category"
                className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
              {t.products.create.description}
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.products.create.placeholders.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.products.create.image}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700"
          >
            {t.products.create.submit}
          </button>
        </form>
      </div>
    </div>
  );
}

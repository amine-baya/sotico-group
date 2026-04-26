"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productSizeOptions } from "./options";
import { productFeatureOptions } from "./feature-options";
import { ProductColorSelector } from "./ProductColorSelector";
import { ProductImageUploader } from "./ProductImageUploader";
import { AdminCategory, AdminColor, AdminFeature } from "./types";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  subCategoryId: string;
  sizes: string[];
  colors: AdminColor[];
  features: AdminFeature[];
};

const emptyProductForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  subCategoryId: "",
  sizes: [],
  colors: [],
  features: [],
};

const imageSlotCount = 3;

export function CreateProductScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyProductForm);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array.from({ length: imageSlotCount }, () => null)
  );
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(
    Array.from({ length: imageSlotCount }, () => "")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subCategories = categories.flatMap((category) => category.subCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories");
        const categoriesData = await readJsonResponse<AdminCategory[]>(
          response,
          "Unable to load categories"
        );

        setCategories(categoriesData);
        setForm((current) => ({
          ...current,
          subCategoryId: current.subCategoryId || categoriesData[0]?.subCategories[0]?.id || "",
        }));
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to load product creation form.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const previewUrls = imageFiles.map((file) =>
      file ? URL.createObjectURL(file) : ""
    );
    setImagePreviewUrls(previewUrls);

    return () => {
      previewUrls.forEach((previewUrl) => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, [imageFiles]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.subCategoryId) {
      setErrorMessage("Create a sub-category before adding products.");
      return;
    }

    if (imageFiles.some((file) => !file)) {
      setErrorMessage("Please upload the three product images.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      const imageUrls = await Promise.all(
        imageFiles.map((file, index) => uploadProductImage(file as File, index))
      );

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: form.price ? Number(form.price) : null,
          imageUrls,
          subCategoryId: form.subCategoryId,
          sizes: form.sizes,
          colors: form.colors,
          features: form.features,
        }),
      });

      await readJsonResponse(response, "Unable to create product");
      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create product.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSize = (size: string) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : [...current.sizes, size],
    }));
  };

  const toggleColor = (color: AdminColor) => {
    setForm((current) => ({
      ...current,
      colors: current.colors.some((item) => item.id === color.id)
        ? current.colors.filter((item) => item.id !== color.id)
        : [...current.colors, color],
    }));
  };

  const toggleFeature = (feature: AdminFeature) => {
    setForm((current) => ({
      ...current,
      features: current.features.some((item) => item.id === feature.id)
        ? current.features.filter((item) => item.id !== feature.id)
        : [...current.features, feature],
    }));
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fa_100%)] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <CardHeader className="border-b border-slate-100 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Create product</CardTitle>
                <CardDescription>
                  Add product information, choose its sub-category, and upload the three gallery images.
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4" />
                  Back to dashboard
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            {errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            {isLoading ? (
              <div className="h-[520px] animate-pulse rounded-[24px] bg-slate-100" />
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <ProductField
                    label="Product name"
                    value={form.name}
                    onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                    placeholder="Premium scrub set"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">Sub-category</label>
                    <select
                      value={form.subCategoryId}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, subCategoryId: event.target.value }))
                      }
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                    >
                      {subCategories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {categories.find((category) => category.id === subCategory.categoryId)?.name} / {subCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ProductField
                    label="Price"
                    value={form.price}
                    onChange={(value) => setForm((current) => ({ ...current, price: value }))}
                    placeholder="149.00"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, description: event.target.value }))
                      }
                      rows={4}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                      placeholder="Describe the fit, fabric, and intended usage."
                    />
                  </div>
                </div>

                <ProductImageUploader
                  label="Product images"
                  imageUrls={imagePreviewUrls}
                  helpText="Upload all three images at once from a single picker."
                  onChange={(files) => {
                    const nextFiles = Array.from({ length: imageSlotCount }, (_, index) =>
                      files[index] ?? null
                    );
                    setImageFiles(nextFiles);
                  }}
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-600">Sizes</label>
                  <div className="flex flex-wrap gap-3">
                    {productSizeOptions.map((size) => {
                      const isActive = form.sizes.includes(size);

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? "border-sky-600 bg-sky-600 text-white"
                              : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <ProductColorSelector selectedColors={form.colors} onToggle={toggleColor} />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-600">
                    Product feature icons
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {productFeatureOptions.map(({ Icon, ...feature }) => {
                      const isActive = form.features.some(
                        (item) => item.id === feature.id
                      );

                      return (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                            isActive
                              ? "border-sky-600 bg-sky-50 text-sky-800"
                              : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                          }`}
                        >
                          <span
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                              isActive ? "bg-sky-600 text-white" : "bg-slate-100"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          {feature.name.en}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-end gap-3 border-t border-slate-100 bg-slate-50/80">
            <Button asChild variant="outline">
              <Link href="/products">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit as never} disabled={isSaving || isLoading}>
              <Plus className="h-4 w-4" />
              {isSaving ? "Saving..." : "Create product"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

async function uploadProductImage(file: File, index: number) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("slot", String(index + 1));

  const response = await fetch("/api/uploads/products", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Unable to upload image");
  }

  const data = (await response.json()) as { url: string };

  return data.url;
}

async function readJsonResponse<T = unknown>(
  response: Response,
  fallbackMessage: string
) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok || data === null) {
    throw new Error(fallbackMessage);
  }

  return data as T;
}

function ProductField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
        placeholder={placeholder}
      />
    </div>
  );
}

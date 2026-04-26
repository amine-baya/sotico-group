"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

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
import { ProductColorSelector } from "./ProductColorSelector";
import { ProductImageUploader } from "./ProductImageUploader";
import { AdminCategory, AdminColor, AdminProduct } from "./types";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  imageUrls: string[];
  subCategoryId: string;
  sizes: string[];
  colors: AdminColor[];
};

export function EditProductScreen({ productId }: { productId: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [form, setForm] = useState<ProductFormState | null>(null);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(["", "", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const subCategories = categories.flatMap((category) => category.subCategories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesResponse, productResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/products/${productId}`),
        ]);

        if (!categoriesResponse.ok || !productResponse.ok) {
          throw new Error("Unable to load product");
        }

        const categoriesData = (await categoriesResponse.json()) as AdminCategory[];
        const product = (await productResponse.json()) as AdminProduct;

        setCategories(categoriesData);
        setForm({
          name: product.name,
          description: product.description || "",
          price: product.price?.toString() || "",
          imageUrls: normalizeImageUrls(product.imageUrls),
          subCategoryId: product.subCategoryId,
          sizes: product.sizes,
          colors: product.colors,
        });
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to load the product editor.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    const previewUrls = imageFiles.map((file, index) => {
      if (file) {
        return URL.createObjectURL(file);
      }

      return form?.imageUrls[index] ?? "";
    });

    setImagePreviewUrls(previewUrls);

    return () => {
      previewUrls.forEach((previewUrl, index) => {
        if (imageFiles[index] && previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, [form?.imageUrls, imageFiles]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form) {
      return;
    }

    if (form.imageUrls.some((imageUrl) => !imageUrl.trim())) {
      setErrorMessage("Please provide the three image URLs.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      const nextImageUrls = [...form.imageUrls];

      for (const [index, file] of imageFiles.entries()) {
        if (file) {
          nextImageUrls[index] = await uploadProductImage(file, index);
        }
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: form.price ? Number(form.price) : null,
          imageUrls: nextImageUrls,
          subCategoryId: form.subCategoryId,
          sizes: form.sizes,
          colors: form.colors,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update product");
      }

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to update the product.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !form) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fa_100%)] px-4 py-10">
        <div className="mx-auto h-[520px] max-w-4xl animate-pulse rounded-[28px] bg-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fa_100%)] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <CardHeader className="border-b border-slate-100 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Edit product</CardTitle>
                <CardDescription>
                  Update the three-image gallery, tagged sizes, and selected colors.
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4" />
                  Back to products
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

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <EditorField
                  label="Product name"
                  value={form.name}
                  onChange={(value) => setForm((current) => current && { ...current, name: value })}
                  placeholder="Premium scrub set"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Sub-category</label>
                  <select
                    value={form.subCategoryId}
                    onChange={(event) =>
                      setForm((current) =>
                        current ? { ...current, subCategoryId: event.target.value } : current
                      )
                    }
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                  >
                    {subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {categories.find((category) => category.id === subCategory.categoryId)
                          ?.name}{" "}
                        / {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <EditorField
                  label="Price"
                  value={form.price}
                  onChange={(value) => setForm((current) => current && { ...current, price: value })}
                  placeholder="149.00"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) =>
                        current ? { ...current, description: event.target.value } : current
                      )
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
                helpText="Choose 1 to 3 replacement images from a single upload field. Unchanged images stay as they are."
                onChange={(files) => {
                  const nextFiles = Array.from({ length: 3 }, (_, index) => files[index] ?? null);
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
                        onClick={() =>
                          setForm((current) =>
                            current
                              ? {
                                  ...current,
                                  sizes: current.sizes.includes(size)
                                    ? current.sizes.filter((item) => item !== size)
                                    : [...current.sizes, size],
                                }
                              : current
                          )
                        }
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

              <ProductColorSelector
                selectedColors={form.colors}
                onToggle={(color) =>
                  setForm((current) =>
                    current
                      ? {
                          ...current,
                          colors: current.colors.some((item) => item.id === color.id)
                            ? current.colors.filter((item) => item.id !== color.id)
                            : [...current.colors, color],
                        }
                      : current
                  )
                }
              />
            </form>
          </CardContent>
          <CardFooter className="justify-end gap-3 border-t border-slate-100 bg-slate-50/80">
            <Button asChild variant="outline">
              <Link href="/products">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit as never} disabled={isSaving}>
              <Save className="h-4 w-4" />
              Save changes
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

function EditorField({
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
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-sky-400"
        placeholder={placeholder}
      />
    </div>
  );
}

function normalizeImageUrls(imageUrls: string[]) {
  return [...imageUrls, "", "", ""].slice(0, 3);
}

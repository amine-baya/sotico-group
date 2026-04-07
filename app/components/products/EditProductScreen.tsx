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
import { AdminCategory, AdminProduct } from "./types";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  sizes: string;
  colors: string;
};

export function EditProductScreen({ productId }: { productId: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [form, setForm] = useState<ProductFormState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          imageUrl: product.imageUrl || "",
          categoryId: product.categoryId,
          sizes: product.sizes.join(", "),
          colors: stringifyColors(product.colors),
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form) {
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: form.price ? Number(form.price) : null,
          imageUrl: form.imageUrl,
          categoryId: form.categoryId,
          sizes: form.sizes
            .split(",")
            .map((size) => size.trim())
            .filter(Boolean),
          colors: parseColors(form.colors),
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
                  Update the category, image, sizes, and styling details.
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
          <CardContent className="py-6">
            {errorMessage ? (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <EditorField
                  label="Product name"
                  value={form.name}
                  onChange={(value) => setForm((current) => current && { ...current, name: value })}
                  placeholder="Premium scrub set"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Category</label>
                  <select
                    value={form.categoryId}
                    onChange={(event) =>
                      setForm((current) =>
                        current ? { ...current, categoryId: event.target.value } : current
                      )
                    }
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
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
                <EditorField
                  label="Image URL"
                  value={form.imageUrl}
                  onChange={(value) =>
                    setForm((current) => current && { ...current, imageUrl: value })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

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

              <div className="grid gap-4 md:grid-cols-2">
                <EditorField
                  label="Sizes"
                  value={form.sizes}
                  onChange={(value) => setForm((current) => current && { ...current, sizes: value })}
                  placeholder="XS, S, M, L, XL"
                />
                <EditorField
                  label="Colors"
                  value={form.colors}
                  onChange={(value) =>
                    setForm((current) => current && { ...current, colors: value })
                  }
                  placeholder="navy|Navy|Marine|#1E3A5F, white|White|Blanc|#F4F4F5"
                />
              </div>
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
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
        placeholder={placeholder}
      />
    </div>
  );
}

function stringifyColors(colors: AdminProduct["colors"]) {
  return colors
    .map((color) => `${color.id}|${color.name.en}|${color.name.fr}|${color.hex}`)
    .join(", ");
}

function parseColors(value: string) {
  if (!value.trim()) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [id, nameEn, nameFr, hex] = entry.split("|").map((part) => part.trim());

      return {
        id,
        name: {
          en: nameEn,
          fr: nameFr,
        },
        hex,
      };
    })
    .filter((color) => color.id && color.name.en && color.name.fr && color.hex);
}

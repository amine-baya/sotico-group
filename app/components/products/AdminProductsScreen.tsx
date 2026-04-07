"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminCategory, AdminColor, AdminProduct } from "./types";

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  sizes: string;
  colors: string;
};

const emptyProductForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  categoryId: "",
  sizes: "",
  colors: "",
};

export function AdminProductsScreen() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [categoriesResponse, productsResponse] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products"),
      ]);

      const categoriesData = (await categoriesResponse.json()) as AdminCategory[];
      const productsData = (await productsResponse.json()) as AdminProduct[];

      setCategories(categoriesData);
      setProducts(productsData);
      setProductForm((currentForm) => ({
        ...currentForm,
        categoryId: currentForm.categoryId || categoriesData[0]?.id || "",
      }));
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to load the admin catalog.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCategory = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    try {
      setIsSavingCategory(true);
      setErrorMessage("");

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Unable to create category");
      }

      const category = (await response.json()) as AdminCategory;
      setCategories((current) => [...current, category].sort((a, b) => a.name.localeCompare(b.name)));
      setProductForm((current) => ({
        ...current,
        categoryId: current.categoryId || category.id,
      }));
      setCategoryName("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create category.");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!productForm.categoryId) {
      setErrorMessage("Create a category before adding products.");
      return;
    }

    try {
      setIsSavingProduct(true);
      setErrorMessage("");

      const payload = {
        name: productForm.name,
        description: productForm.description,
        price: productForm.price ? Number(productForm.price) : null,
        imageUrl: productForm.imageUrl,
        categoryId: productForm.categoryId,
        sizes: productForm.sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean),
        colors: parseColors(productForm.colors),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to create product");
      }

      const product = (await response.json()) as AdminProduct;
      setProducts((current) => [product, ...current]);
      setProductForm((current) => ({
        ...emptyProductForm,
        categoryId: current.categoryId,
      }));
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create product.");
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete product");
      }

      setProducts((current) => current.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fa_100%)] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">
              Admin Studio
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Manage categories and products
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              A single admin space for your Postgres catalog. Create categories,
              add products, and keep the showroom content updated.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to website</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
          <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0">
            <CardHeader className="border-b border-slate-100 py-6">
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Add and organize the families your products belong to.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <form className="space-y-3" onSubmit={handleCreateCategory}>
                <label className="block text-sm font-medium text-slate-600">
                  Category name
                </label>
                <div className="flex gap-3">
                  <input
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                    className="h-11 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none ring-0 transition focus:border-sky-400 focus:bg-white"
                    placeholder="Healthcare"
                  />
                  <Button type="submit" size="lg" disabled={isSavingCategory}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </form>

              <div className="grid gap-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-sky-100 p-2 text-sky-700">
                        <Tag className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-medium text-slate-800">{category.name}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                          {category.slug}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                      {category._count?.products ?? 0} products
                    </span>
                  </div>
                ))}

                {!isLoading && categories.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                    No categories yet.
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0">
            <CardHeader className="border-b border-slate-100 py-6">
              <CardTitle>Create product</CardTitle>
              <CardDescription>
                Add a product with an image URL, sizes, and bilingual color labels.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <form className="space-y-5" onSubmit={handleCreateProduct}>
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField
                    label="Product name"
                    value={productForm.name}
                    onChange={(value) =>
                      setProductForm((current) => ({ ...current, name: value }))
                    }
                    placeholder="Premium scrub set"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">
                      Category
                    </label>
                    <select
                      value={productForm.categoryId}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          categoryId: event.target.value,
                        }))
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
                  <AdminField
                    label="Price"
                    value={productForm.price}
                    onChange={(value) =>
                      setProductForm((current) => ({ ...current, price: value }))
                    }
                    placeholder="149.00"
                  />
                  <AdminField
                    label="Image URL"
                    value={productForm.imageUrl}
                    onChange={(value) =>
                      setProductForm((current) => ({ ...current, imageUrl: value }))
                    }
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">
                    Description
                  </label>
                  <textarea
                    value={productForm.description}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                    placeholder="Describe the fit, fabric, and intended usage."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField
                    label="Sizes"
                    value={productForm.sizes}
                    onChange={(value) =>
                      setProductForm((current) => ({ ...current, sizes: value }))
                    }
                    placeholder="XS, S, M, L, XL"
                  />
                  <AdminField
                    label="Colors"
                    value={productForm.colors}
                    onChange={(value) =>
                      setProductForm((current) => ({ ...current, colors: value }))
                    }
                    placeholder="navy|Navy|Marine|#1E3A5F, white|White|Blanc|#F4F4F5"
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSavingProduct}>
                  <Plus className="h-4 w-4" />
                  Create product
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0">
          <CardHeader className="border-b border-slate-100 py-6">
            <CardTitle>Product library</CardTitle>
            <CardDescription>
              Review every product currently stored in Postgres and jump into edit mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            {isLoading ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-[24px] bg-slate-100"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="rounded-[24px] border border-slate-200 bg-white py-0 shadow-none"
                  >
                    <div className="relative h-52 overflow-hidden rounded-t-[24px] bg-slate-100">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No image
                        </div>
                      )}
                    </div>
                    <CardContent className="space-y-3 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                            {product.category.name}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {product.name}
                          </h3>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                          {product.price ? `${product.price} TND` : "No price"}
                        </span>
                      </div>
                      <p className="line-clamp-3 text-sm text-slate-500">
                        {product.description || "No description yet."}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-3 border-t border-slate-100 bg-slate-50/80">
                      <Button asChild variant="outline" className="flex-1">
                        <Link href={`/products/edit/${product.id}`}>
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminField({
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

function parseColors(value: string): AdminColor[] {
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Pencil, Plus, Tag, Trash2, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminCategory, AdminProduct, AdminSubCategory, AdminUser } from "./types";

type EditModalState =
  | { type: "category"; item: AdminCategory; name: string }
  | { type: "subCategory"; item: AdminSubCategory; name: string };

type DeleteModalState =
  | {
      type: "category";
      id: string;
      title: string;
      description: string;
      endpoint: string;
    }
  | {
      type: "subCategory";
      id: string;
      title: string;
      description: string;
      endpoint: string;
    }
  | {
      type: "product";
      id: string;
      title: string;
      description: string;
      endpoint: string;
    };

export function AdminProductsScreen() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [categoryImagePreviewUrl, setCategoryImagePreviewUrl] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryParentId, setSubCategoryParentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingAdmin, setIsSavingAdmin] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isSavingSubCategory, setIsSavingSubCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editModal, setEditModal] = useState<EditModalState | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const requests = [
        fetch("/api/categories"),
        fetch("/api/products"),
      ] as const;
      const [categoriesResponse, productsResponse] = await Promise.all(requests);
      const categoriesData = await readJsonResponse<AdminCategory[]>(
        categoriesResponse,
        "Unable to load categories"
      );
      const productsData = await readJsonResponse<AdminProduct[]>(
        productsResponse,
        "Unable to load products"
      );

      setCategories(categoriesData);
      setProducts(productsData);
      setSubCategoryParentId((current) =>
        categoriesData.some((category) => category.id === current)
          ? current
          : categoriesData[0]?.id || ""
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to load the admin catalog.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!adminEmail.trim() || adminPassword.length < 8) {
      setErrorMessage(
        "Please provide a valid admin email and a password with at least 8 characters."
      );
      return;
    }

    try {
      setIsSavingAdmin(true);
      setErrorMessage("");

      const response = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
        }),
      });

      const createdAdmin = await readJsonResponse<AdminUser>(
        response,
        "Unable to create admin"
      );

      setAdmins((current) => [createdAdmin, ...current]);
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create admin.");
    } finally {
      setIsSavingAdmin(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isSuperAdmin) {
      setAdmins([]);
      return;
    }

    async function fetchAdmins() {
      try {
        const response = await fetch("/api/admins");
        const adminsData = await readJsonResponse<AdminUser[]>(
          response,
          "Unable to load admins"
        );
        setAdmins(adminsData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to load admins.");
      }
    }

    fetchAdmins();
  }, [isSuperAdmin]);

  useEffect(() => {
    if (!categoryImageFile) {
      setCategoryImagePreviewUrl("");
      return;
    }

    const previewUrl = URL.createObjectURL(categoryImageFile);
    setCategoryImagePreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [categoryImageFile]);

  const handleCreateCategory = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    if (!categoryImageFile) {
      setErrorMessage("Please upload a category image.");
      return;
    }

    try {
      setIsSavingCategory(true);
      setErrorMessage("");

      const imageUrl = await uploadCategoryImage(categoryImageFile);

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Unable to create category");
      }

      const category = await readJsonResponse<AdminCategory>(
        response,
        "Unable to create category"
      );
      setCategories((current) =>
        [...current, category].sort((a, b) => a.name.localeCompare(b.name))
      );
      setSubCategoryParentId((current) => current || category.id);
      setCategoryName("");
      setCategoryImageFile(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create category.");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleCreateSubCategory = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!subCategoryName.trim() || !subCategoryParentId) {
      return;
    }

    try {
      setIsSavingSubCategory(true);
      setErrorMessage("");

      const response = await fetch("/api/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subCategoryName,
          categoryId: subCategoryParentId,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create sub-category");
      }

      const subCategory = await readJsonResponse<AdminSubCategory>(
        response,
        "Unable to create sub-category"
      );
      setCategories((current) =>
        current.map((category) =>
          category.id === subCategory.categoryId
            ? {
                ...category,
                subCategories: [...category.subCategories, subCategory].sort((a, b) =>
                  a.name.localeCompare(b.name)
                ),
                _count: {
                  subCategories: (category._count?.subCategories ?? 0) + 1,
                },
              }
            : category
        )
      );
      setSubCategoryName("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create sub-category.");
    } finally {
      setIsSavingSubCategory(false);
    }
  };

  const handleUpdateCategory = async (category: AdminCategory) => {
    setEditModal({ type: "category", item: category, name: category.name });
  };

  const handleSaveEditModal = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editModal?.name.trim()) {
      return;
    }

    try {
      setIsSavingEdit(true);
      setErrorMessage("");

      const response = await fetch(
        editModal.type === "category"
          ? `/api/categories/${editModal.item.id}`
          : `/api/subcategories/${editModal.item.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            editModal.type === "category"
              ? { name: editModal.name.trim() }
              : {
                  name: editModal.name.trim(),
                  categoryId: editModal.item.categoryId,
                }
          ),
        }
      );

      await readJsonResponse<AdminCategory | AdminSubCategory>(
        response,
        editModal.type === "category"
          ? "Unable to update category"
          : "Unable to update sub-category"
      );
      setEditModal(null);
      await fetchData();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        editModal?.type === "category"
          ? "Unable to update category."
          : "Unable to update sub-category."
      );
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDeleteCategory = async (category: AdminCategory) => {
    setDeleteModal({
      type: "category",
      id: category.id,
      title: `Delete ${category.name}?`,
      description:
        "This will permanently delete the category, its sub-categories, and every product inside them.",
      endpoint: `/api/categories/${category.id}`,
    });
  };

  const handleUpdateSubCategory = async (subCategory: AdminSubCategory) => {
    setEditModal({
      type: "subCategory",
      item: subCategory,
      name: subCategory.name,
    });
  };

  const handleDeleteSubCategory = async (subCategory: AdminSubCategory) => {
    setDeleteModal({
      type: "subCategory",
      id: subCategory.id,
      title: `Delete ${subCategory.name}?`,
      description:
        "This will permanently delete the sub-category and every product assigned to it.",
      endpoint: `/api/subcategories/${subCategory.id}`,
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    const product = products.find((item) => item.id === productId);

    setDeleteModal({
      type: "product",
      id: productId,
      title: `Delete ${product?.name ?? "this product"}?`,
      description:
        "This will permanently delete the product and remove its uploaded product images.",
      endpoint: `/api/products/${productId}`,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");

      const response = await fetch(deleteModal.endpoint, {
        method: "DELETE",
      });

      await readJsonResponse<{ success: boolean }>(
        response,
        `Unable to delete ${deleteModal.type}`
      );
      setDeleteModal(null);
      await fetchData();
    } catch (error) {
      console.error(error);
      setErrorMessage(`Unable to delete ${deleteModal.type}.`);
    } finally {
      setIsDeleting(false);
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
              Manage categories, sub-categories, and products
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Build the catalog hierarchy from category to sub-category, then add
              products with info, colors, sizes, and a three-image gallery.
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

        <div className="space-y-8">
          {isSuperAdmin ? (
          <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0">
            <CardHeader className="border-b border-slate-100 py-6">
              <CardTitle>Super admin access</CardTitle>
              <CardDescription>
                Add new admin accounts for teammates who need access to the protected dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <form className="space-y-4" onSubmit={handleCreateAdmin}>
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField
                    label="Admin name"
                    value={adminName}
                    onChange={setAdminName}
                    placeholder="Operations Manager"
                  />
                  <AdminField
                    label="Admin email"
                    type="email"
                    value={adminEmail}
                    onChange={setAdminEmail}
                    placeholder="manager@sotico-group.com"
                  />
                </div>
                <AdminField
                  label="Temporary password"
                  type="password"
                  value={adminPassword}
                  onChange={setAdminPassword}
                  placeholder="At least 8 characters"
                />
                <Button type="submit" size="lg" disabled={isSavingAdmin}>
                  <Plus className="h-4 w-4" />
                  {isSavingAdmin ? "Adding admin..." : "Add admin"}
                </Button>
              </form>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Existing admins
                </p>
                <div className="mt-4 space-y-3">
                  {admins.map((admin) => (
                    <div
                      key={admin.id}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <p className="font-semibold text-slate-900">
                        {admin.name?.trim() || "Unnamed admin"}
                      </p>
                      <p className="text-sm text-slate-600">{admin.email}</p>
                    </div>
                  ))}

                  {!isLoading && admins.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
                      No admins found.
                    </div>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
          ) : null}

          <div>
          <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0">
            <CardHeader className="border-b border-slate-100 py-6">
              <CardTitle>Categories and sub-categories</CardTitle>
              <CardDescription>
                Create top-level families first, then add the sub-categories that hold products.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 py-6">
              <form className="space-y-3" onSubmit={handleCreateCategory}>
                <label className="block text-sm font-medium text-slate-600">
                  Category name
                </label>
                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
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
                <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm transition hover:border-sky-300 hover:bg-white">
                  <span className="font-medium text-slate-600">
                    Category image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) =>
                      setCategoryImageFile(event.target.files?.[0] ?? null)
                    }
                  />
                  <span className="mt-2 block text-xs text-slate-500">
                    Choose an image for the home category card and workwear menu.
                  </span>
                  {categoryImagePreviewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={categoryImagePreviewUrl}
                      alt="Category preview"
                      className="mt-3 h-28 w-full rounded-xl object-cover"
                    />
                  ) : null}
                </label>
              </form>

              <form className="space-y-3" onSubmit={handleCreateSubCategory}>
                <label className="block text-sm font-medium text-slate-600">
                  Sub-category
                </label>
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <select
                    value={subCategoryParentId}
                    onChange={(event) => setSubCategoryParentId(event.target.value)}
                    className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none ring-0 transition focus:border-sky-400 focus:bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    value={subCategoryName}
                    onChange={(event) => setSubCategoryName(event.target.value)}
                    className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none ring-0 transition focus:border-sky-400 focus:bg-white"
                    placeholder="Scrubs"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSavingSubCategory || categories.length === 0}
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </form>

              <div className="grid gap-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
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
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                          {category._count?.subCategories ?? category.subCategories.length} sub-categories
                        </span>
                        <Button
                          asChild
                          type="button"
                          variant="outline"
                          size="sm"
                        >
                          <Link href="/products/create">
                            <Plus className="h-3.5 w-3.5" />
                            Insert new product
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateCategory(category)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.subCategories.map((subCategory) => (
                        <span
                          key={subCategory.id}
                          className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-3 py-1 text-xs font-medium text-slate-500"
                        >
                          {subCategory.name} · {subCategory._count?.products ?? 0}
                          <button
                            type="button"
                            onClick={() => handleUpdateSubCategory(subCategory)}
                            className="font-semibold text-sky-700 transition hover:text-sky-900"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSubCategory(subCategory)}
                            className="font-semibold text-red-600 transition hover:text-red-800"
                          >
                            Delete
                          </button>
                        </span>
                      ))}
                    </div>
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
          </div>
        </div>

        <Card className="rounded-[28px] border-slate-200/80 bg-white/95 py-0">
          <CardHeader className="border-b border-slate-100 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Product library</CardTitle>
                <CardDescription>
                  Review every product currently stored in Postgres and jump into edit mode.
                </CardDescription>
              </div>
              <Button asChild size="lg">
                <Link href="/products/create">
                  <Plus className="h-4 w-4" />
                  Create product
                </Link>
              </Button>
            </div>
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
                      {product.imageUrls[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrls[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No image
                        </div>
                      )}
                    </div>
                    <CardContent className="space-y-4 py-4">
                      <div className="flex gap-2">
                        {product.imageUrls.map((imageUrl, index) => (
                          <div
                            key={`${product.id}-${index}`}
                            className="h-14 w-14 overflow-hidden rounded-xl bg-slate-100"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imageUrl}
                              alt={`${product.name} ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                            {product.subCategory.category.name} / {product.subCategory.name}
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
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <span
                            key={color.id}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            <span
                              className="h-3 w-3 rounded-full border border-slate-300"
                              style={{ backgroundColor: color.hex }}
                            />
                            {color.name.en}
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

      {editModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleSaveEditModal}
            className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.28)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
                  Edit {editModal.type === "category" ? "category" : "sub-category"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  {editModal.type === "category"
                    ? "Update category"
                    : "Update sub-category"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Rename it here. Slugs are regenerated automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditModal(null)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 px-6 py-6">
              <label className="text-sm font-medium text-slate-600">Name</label>
              <input
                value={editModal.name}
                onChange={(event) =>
                  setEditModal((current) =>
                    current ? { ...current, name: event.target.value } : current
                  )
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditModal(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSavingEdit}>
                {isSavingEdit ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      {deleteModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-[28px] border border-red-100 bg-white shadow-[0_30px_120px_rgba(127,29,29,0.25)]">
            <div className="flex items-start justify-between gap-4 border-b border-red-100 bg-red-50/70 px-6 py-5">
              <div className="flex gap-4">
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
                  <Trash2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-700">
                    Confirm delete
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                    {deleteModal.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                aria-label="Close delete modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-6">
              <p className="text-sm leading-6 text-slate-600">
                {deleteModal.description}
              </p>
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                This action cannot be undone.
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteModal(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete permanently"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

async function readJsonResponse<T>(response: Response, fallbackMessage: string) {
  const text = await response.text();
  const data = parseJsonSafely(text);

  if (!response.ok) {
    const message =
      data && typeof data.message === "string" ? data.message : fallbackMessage;

    throw new Error(message);
  }

  if (data === null) {
    throw new Error(fallbackMessage);
  }

  return data as T;
}

async function uploadCategoryImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/uploads/categories", {
    method: "POST",
    body: formData,
  });

  const data = await readJsonResponse<{ url: string }>(
    response,
    "Unable to upload category image"
  );

  return data.url;
}

function parseJsonSafely(text: string) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as { message?: string };
  } catch {
    return null;
  }
}

function AdminField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
        placeholder={placeholder}
      />
    </div>
  );
}

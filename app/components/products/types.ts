export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  subCategories: AdminSubCategory[];
  _count?: {
    subCategories: number;
  };
};

export type AdminSubCategory = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category?: Omit<AdminCategory, "subCategories" | "_count">;
  _count?: {
    products: number;
  };
};

export type AdminColor = {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  hex: string;
};

export type AdminFeature = {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  icon: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  imageUrls: string[];
  sizes: string[];
  colors: AdminColor[];
  features: AdminFeature[];
  subCategoryId: string;
  subCategory: AdminSubCategory & {
    category: Omit<AdminCategory, "subCategories" | "_count">;
  };
  createdAt: string;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: "SUPER_ADMIN" | "ADMIN";
  createdAt: string;
};

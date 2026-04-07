export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
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

export type AdminProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  sizes: string[];
  colors: AdminColor[];
  categoryId: string;
  category: AdminCategory;
  createdAt: string;
};

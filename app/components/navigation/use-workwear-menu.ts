"use client";

import { useEffect, useState } from "react";

type LocalizedText = {
  en: string;
  fr: string;
};

export type WorkwearMenuCategory = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  subcategories: Array<{
    index: number;
    slug: string;
    title: LocalizedText;
  }>;
};

type ApiCategory = {
  name: string;
  slug: string;
  imageUrl: string | null;
  subCategories?: Array<{
    name: string;
    slug: string;
  }>;
};

const fallbackImages = [
  "/healthcare.png",
  "/industry.png",
  "/hospitality.png",
  "/corporate.png",
  "/cleaning.png",
];

export function useWorkwearMenuCategories() {
  const [backendCategories, setBackendCategories] = useState<
    WorkwearMenuCategory[]
  >([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to fetch categories");
        }

        const categories = (await response.json()) as ApiCategory[];
        const menuCategories = categories
          .map((category, categoryIndex) => ({
            slug: category.slug,
            title: toLocalizedText(category.name),
            description: toLocalizedText(category.name),
            image: category.imageUrl ?? fallbackImages[categoryIndex % fallbackImages.length],
            subcategories: (category.subCategories ?? []).map(
              (subcategory, subcategoryIndex) => ({
                index: subcategoryIndex,
                slug: subcategory.slug,
                title: toLocalizedText(subcategory.name),
              }),
            ),
          }))
          .filter((category) => category.subcategories.length > 0);

        if (isMounted) {
          setBackendCategories(menuCategories);
        }
      } catch {
        if (isMounted) {
          setBackendCategories([]);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return backendCategories;
}

function toLocalizedText(value: string): LocalizedText {
  return {
    en: value,
    fr: value,
  };
}

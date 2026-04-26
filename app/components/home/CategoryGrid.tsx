"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getLocalizedCategorySummaries } from "../catalog/showcase-data";
import { useLanguage } from "../providers/LanguageProvider";

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  subCategories: Array<{
    id: string;
  }>;
};

type CategoryCard = {
  slug: string;
  href?: string;
  image: string;
  title: string;
};

const fallbackImages = [
  "/healthcare.png",
  "/industry.png",
  "/hospitality.png",
  "/corporate.png",
  "/cleaning.png",
];

export default function CategoryGrid() {
  const { locale, t } = useLanguage();
  const fallbackCategories: CategoryCard[] = getLocalizedCategorySummaries(locale).map(
    (category) => ({
      slug: category.slug,
      image: category.image,
      title: category.title,
    })
  );
  const [apiCategories, setApiCategories] = useState<CategoryCard[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to load categories");
        }

        const categories = (await response.json()) as ApiCategory[];
        const nextCategories = categories.map((category, index) => ({
          slug: category.slug,
          href: `/collections/${category.slug}`,
          image: category.imageUrl ?? fallbackImages[index % fallbackImages.length],
          title: category.name,
        }));

        if (isMounted) {
          setApiCategories(nextCategories);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setApiCategories([]);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = apiCategories.length > 0 ? apiCategories : fallbackCategories;

  return (
    <section className="px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCardItem
            key={category.slug}
            category={category}
            ctaLabel={t.home.categoryCta}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCardItem({
  category,
  ctaLabel,
}: {
  category: CategoryCard;
  ctaLabel: string;
}) {
  const content = (
    <div className="relative aspect-[4/4.8] md:aspect-[4/4.6] xl:aspect-[4/4.8]">
      <Image
        src={category.image}
        alt={category.title}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 flex items-end p-6">
        <div className="space-y-3">
          <p className="text-2xl font-bold tracking-[0.28em] text-white uppercase">
            {category.title}
          </p>
          {category.href ? (
            <span className="inline-flex rounded-full border border-amber-100 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-amber-100 group-hover:text-slate-900">
              {ctaLabel}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (category.href) {
    return (
      <Link
        href={category.href}
        className="group relative block overflow-hidden rounded-2xl"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group relative block overflow-hidden rounded-2xl">
      {content}
    </div>
  );
}

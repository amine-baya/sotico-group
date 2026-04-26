"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SiteFooter from "@/app/components/home/SiteFooter";
import SiteHeaderBar from "@/app/components/layout/SiteHeaderBar";
import {
  getCollectionView,
  getShowcaseCategory,
} from "@/app/components/catalog/showcase-data";
import { useLanguage } from "@/app/components/providers/LanguageProvider";

type CollectionView = NonNullable<ReturnType<typeof getCollectionView>>;

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  subCategories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrls: string[];
  sizes: string[];
  colors: Array<{
    id: string;
    name: {
      en: string;
      fr: string;
    };
    hex: string;
  }>;
  subCategoryId: string;
  subCategory: {
    id: string;
    name: string;
    slug: string;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
};

const categoryImages = [
  "/healthcare.png",
  "/industry.png",
  "/hospitality.png",
  "/corporate.png",
  "/cleaning.png",
];

export default function CollectionPage() {
  const { locale, t } = useLanguage();
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const categorySlug = params.category;
  const selectedSubIndex = Number(searchParams.get("sub") ?? "0");
  const staticCollection = getCollectionView(locale, categorySlug, selectedSubIndex);
  const [apiCollection, setApiCollection] = useState<CollectionView | null>(null);
  const [isLoadingApiCollection, setIsLoadingApiCollection] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCollection() {
      try {
        setIsLoadingApiCollection(true);
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch("/api/categories", { cache: "no-store" }),
          fetch("/api/products", { cache: "no-store" }),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
          throw new Error("Unable to load collection");
        }

        const categories = (await categoriesResponse.json()) as ApiCategory[];
        const products = (await productsResponse.json()) as ApiProduct[];
        const nextCollection = buildApiCollectionView(
          categories,
          products,
          categorySlug,
          selectedSubIndex,
          locale
        );

        if (isMounted) {
          setApiCollection(nextCollection);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setApiCollection(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingApiCollection(false);
        }
      }
    }

    fetchCollection();

    return () => {
      isMounted = false;
    };
  }, [categorySlug, locale, selectedSubIndex]);

  const collection = apiCollection ?? staticCollection;

  if (!collection && !isLoadingApiCollection && !getShowcaseCategory(categorySlug)) {
    return (
      <CollectionMessage
        title="Collection not found"
        message="We could not find this category or sub-category yet."
      />
    );
  }

  if (!collection) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
        <SiteHeaderBar />
        <section className="px-6 pb-20 pt-10">
          <div className="mx-auto h-[520px] max-w-7xl animate-pulse rounded-[2rem] bg-white" />
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <SiteHeaderBar />

      <section className="px-6 pb-20 pt-10">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid gap-10 rounded-[2rem] bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                {t.showcase.titlePrefix}
              </p>
              <h1 className="text-4xl font-black text-[#0c437c] md:text-5xl">
                {collection.selectedSubcategory.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
                {collection.category.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {collection.subcategories.map((subcategory) => {
                  const isActive =
                    subcategory.index === collection.selectedSubcategory.index;

                  return (
                    <Link
                      key={subcategory.index}
                      href={`/collections/${collection.category.slug}?sub=${subcategory.index}`}
                      className={[
                        "rounded-full px-5 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-[#0c437c] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                      ].join(" ")}
                    >
                      {subcategory.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-slate-100">
              <Image
                src={collection.category.image}
                alt={collection.category.title}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c437c]/40 to-transparent" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                  {t.showcase.relatedLabel}
                </p>
                <h2 className="text-3xl font-black text-[#0c437c]">
                  {collection.selectedSubcategory.title}
                </h2>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                {collection.selectedSubcategory.products.length} {t.showcase.productsLabel}
              </p>
            </div>

            {collection.selectedSubcategory.products.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {collection.selectedSubcategory.products.map((product) => (
                  <ProductCard
                    key={product.slug}
                    categorySlug={collection.category.slug}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
                  Empty collection
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#0c437c]">
                  There is no product yet
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Products added by the admin for this sub-category will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function CollectionMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <SiteHeaderBar />
      <section className="px-6 pb-20 pt-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
            Not found
          </p>
          <h1 className="mt-3 text-3xl font-black text-[#0c437c] md:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
            {message}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#0c437c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#18599f]"
          >
            Back to home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function buildApiCollectionView(
  categories: ApiCategory[],
  products: ApiProduct[],
  categorySlug: string,
  selectedSubIndex: number,
  locale: "en" | "fr"
): CollectionView | null {
  const categoryIndex = categories.findIndex(
    (category) => category.slug === categorySlug
  );
  const category = categories[categoryIndex];

  if (!category || category.subCategories.length === 0) {
    return null;
  }

  const selectedSubcategory =
    category.subCategories[selectedSubIndex] ?? category.subCategories[0];
  const selectedProducts = products.filter(
    (product) => product.subCategoryId === selectedSubcategory.id
  );

  return {
    category: {
      slug: category.slug,
      title: category.name,
      description: category.name,
      image: category.imageUrl ?? categoryImages[categoryIndex % categoryImages.length],
    },
    selectedSubcategory: {
      index: category.subCategories.indexOf(selectedSubcategory),
      title: selectedSubcategory.name,
      products: selectedProducts.map((product) => ({
        slug: product.slug,
        title: product.name,
        description: product.description ?? "",
        image: product.imageUrls[0] ?? categoryImages[categoryIndex % categoryImages.length],
        gallery: product.imageUrls,
        colors: product.colors.map((color) => ({
          id: color.id,
          name: color.name[locale],
          hex: color.hex,
        })),
        sizes: product.sizes,
      })),
    },
    subcategories: category.subCategories.map((subcategory, index) => ({
      index,
      title: subcategory.name,
    })),
  };
}

function ProductCard({
  categorySlug,
  product,
}: {
  categorySlug: string;
  product: {
    slug: string;
    title: string;
    description: string;
    image: string;
    colors: Array<{ id: string; name: string; hex: string }>;
    sizes: string[];
  };
}) {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id ?? "");

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/collections/${categorySlug}/products/${product.slug}`}
        className="block"
      >
        <div className="relative mb-4 aspect-[4/4.5] overflow-hidden rounded-[1.4rem] bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </Link>

      <Link
        href={`/collections/${categorySlug}/products/${product.slug}`}
        className="text-xl font-bold text-[#0c437c]"
      >
        {product.title}
      </Link>

      <div className="mt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          {t.showcase.colorLabel}
        </p>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <label key={color.id} className="cursor-pointer">
              <input
                type="radio"
                name={`color-${product.slug}`}
                value={color.id}
                checked={selectedColor === color.id}
                onChange={() => setSelectedColor(color.id)}
                className="sr-only"
              />
              <span
                title={color.name}
                className={[
                  "block h-7 w-7 rounded-full border-2 transition",
                  selectedColor === color.id
                    ? "scale-110 border-slate-900"
                    : "border-white shadow",
                ].join(" ")}
                style={{ backgroundColor: color.hex }}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

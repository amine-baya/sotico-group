"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import SiteFooter from "@/app/components/home/SiteFooter";
import SiteHeaderBar from "@/app/components/layout/SiteHeaderBar";
import { getShowcaseProduct } from "@/app/components/catalog/showcase-data";
import { useLanguage } from "@/app/components/providers/LanguageProvider";
import { productFeatureOptions } from "@/app/components/products/feature-options";
import { AdminFeature } from "@/app/components/products/types";

type LocalizedProductFeature = {
  id: string;
  name: string;
  icon: string;
};

type ProductView = {
  category: {
    slug: string;
    title: string;
  };
  subcategory: {
    index: number;
    title: string;
  };
  product: {
    slug: string;
    title: string;
    description: string;
    image: string;
    gallery: string[];
    colors: Array<{
      id: string;
      name: string;
      hex: string;
    }>;
    sizes: string[];
    features?: LocalizedProductFeature[];
  };
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
  features: AdminFeature[] | null;
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

export default function ShowcaseProductPage() {
  const { locale, t } = useLanguage();
  const params = useParams<{ category: string; product: string }>();
  const staticProductView = getShowcaseProduct(
    locale,
    params.category,
    params.product
  ) as ProductView | null;
  const [apiProductView, setApiProductView] = useState<ProductView | null>(null);
  const [isLoadingApiProduct, setIsLoadingApiProduct] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        setIsLoadingApiProduct(true);
        const response = await fetch("/api/products", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const products = (await response.json()) as ApiProduct[];
        const product = products.find(
          (item) =>
            item.slug === params.product &&
            item.subCategory.category.slug === params.category
        );

        if (isMounted) {
          setApiProductView(product ? buildApiProductView(product, locale) : null);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setApiProductView(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingApiProduct(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [locale, params.category, params.product]);

  const productView = apiProductView ?? staticProductView;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (!productView) {
      return;
    }

    setSelectedColor(productView.product.colors[0]?.id ?? "");
    setSelectedSize(productView.product.sizes[0] ?? "");
    setSelectedImageIndex(0);
    setIsGalleryOpen(false);
  }, [productView]);

  if (!productView && !isLoadingApiProduct) {
    return (
      <ProductMessage
        title="Product not found"
        message="We could not find this product yet. It may have been removed or not published."
        backHref={`/collections/${params.category}`}
      />
    );
  }

  if (!productView) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
        <SiteHeaderBar />
        <section className="px-6 pb-24 pt-10">
          <div className="mx-auto h-[620px] max-w-7xl animate-pulse rounded-[2rem] bg-white" />
        </section>
        <SiteFooter />
      </main>
    );
  }
  const selectedImage =
    productView.product.gallery[selectedImageIndex] ?? productView.product.image;

  const openGalleryAt = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const showPreviousImage = () => {
    setSelectedImageIndex((current) =>
      current === 0 ? productView.product.gallery.length - 1 : current - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((current) =>
      current === productView.product.gallery.length - 1 ? 0 : current + 1
    );
  };

  const handleGalleryKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }

    if (event.key === "Escape") {
      setIsGalleryOpen(false);
    }
  };

  const galleryImages =
    productView.product.gallery.length > 0
      ? productView.product.gallery
      : [productView.product.image];

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <SiteHeaderBar />

      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <Link
            href={`/collections/${productView.category.slug}?sub=${productView.subcategory.index}`}
            className="inline-flex rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-700 transition hover:bg-white"
          >
            {t.showcase.backToCollections}
          </Link>

          <div className="grid gap-10 rounded-[2rem] bg-white p-8 shadow-sm lg:grid-cols-[1fr_0.95fr]">
            <div className="grid gap-4 md:grid-cols-[96px_1fr]">
              <div className="order-2 flex gap-3 md:order-1 md:flex-col">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={[
                      "relative h-24 w-24 overflow-hidden rounded-2xl border-2 bg-slate-100 transition",
                      selectedImageIndex === index
                        ? "border-[#0c437c] shadow-md"
                        : "border-transparent hover:border-slate-300",
                    ].join(" ")}
                  >
                    <Image
                      src={image}
                      alt={`${productView.product.title} view ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openGalleryAt(selectedImageIndex)}
                className="relative order-1 min-h-[520px] overflow-hidden rounded-[1.75rem] bg-slate-100 md:order-2"
              >
                <Image
                  src={selectedImage}
                  alt={productView.product.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 60vw"
                  className="object-cover transition duration-300 hover:scale-[1.03]"
                />
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                  {productView.subcategory.title}
                </p>
                <h1 className="text-4xl font-black text-[#0c437c] md:text-5xl">
                  {productView.product.title}
                </h1>
                <p className="text-lg leading-relaxed text-slate-600">
                  {productView.product.description}
                </p>
              </div>

              {productView.product.features &&
              productView.product.features.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {productView.product.features.map((feature) => {
                    const option = productFeatureOptions.find(
                      (item) => item.id === feature.id
                    );
                    const Icon = option?.Icon;

                    return (
                      <div
                        key={feature.id}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0c437c] shadow-sm">
                          {Icon ? <Icon className="h-5 w-5" /> : feature.icon}
                        </span>
                        <span className="font-semibold text-slate-700">
                          {feature.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  {t.showcase.colorLabel}
                </p>
                <div className="flex flex-wrap gap-3">
                  {productView.product.colors.map((color) => (
                    <label
                      key={color.id}
                      className="flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 px-3 py-2"
                    >
                      <input
                        type="radio"
                        name="showcase-color"
                        value={color.id}
                        checked={selectedColor === color.id}
                        onChange={() => setSelectedColor(color.id)}
                        className="sr-only"
                      />
                      <span
                        className={[
                          "block h-6 w-6 rounded-full border-2",
                          selectedColor === color.id
                            ? "border-slate-900"
                            : "border-white shadow",
                        ].join(" ")}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium text-slate-700">{color.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  {t.showcase.sizesLabel}
                </p>
                <div className="flex flex-wrap gap-3">
                  {productView.product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={[
                        "rounded-full border px-4 py-2 font-semibold transition",
                        selectedSize === size
                          ? "border-[#0c437c] bg-[#0c437c] text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400",
                      ].join(" ")}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                  {t.showcase.relatedLabel}
                </p>
                <div className="space-y-2 text-slate-700">
                  <p>
                    <span className="font-semibold">{t.showcase.subcategoryLabel}:</span>{" "}
                    {productView.subcategory.title}
                  </p>
                  <p>
                    <span className="font-semibold">{t.showcase.colorLabel}:</span>{" "}
                    {
                      productView.product.colors.find((color) => color.id === selectedColor)
                        ?.name
                    }
                  </p>
                  <p>
                    <span className="font-semibold">{t.showcase.sizesLabel}:</span>{" "}
                    {selectedSize}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isGalleryOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/92 p-6"
          onKeyDown={handleGalleryKeyDown}
          tabIndex={0}
        >
          <button
            type="button"
            onClick={() => setIsGalleryOpen(false)}
            className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={showPreviousImage}
            className="absolute left-6 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-[2rem]">
            <Image
              src={selectedImage}
              alt={productView.product.title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={showNextImage}
            className="absolute right-6 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-white/10 px-4 py-3 backdrop-blur">
            {galleryImages.map((image, index) => (
              <button
                key={`fullscreen-${image}-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={[
                  "relative h-14 w-14 overflow-hidden rounded-xl border-2 transition",
                  selectedImageIndex === index
                    ? "border-white"
                    : "border-transparent opacity-70 hover:opacity-100",
                ].join(" ")}
              >
                <Image
                  src={image}
                  alt={`${productView.product.title} fullscreen view ${index + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <SiteFooter />
    </main>
  );
}

function ProductMessage({
  title,
  message,
  backHref,
}: {
  title: string;
  message: string;
  backHref: string;
}) {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <SiteHeaderBar />
      <section className="px-6 pb-24 pt-10">
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={backHref}
              className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to collection
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#0c437c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#18599f]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function buildApiProductView(
  product: ApiProduct,
  locale: "en" | "fr"
): ProductView {
  const gallery =
    product.imageUrls.length > 0 ? product.imageUrls : ["/healthcare.png"];

  return {
    category: {
      slug: product.subCategory.category.slug,
      title: product.subCategory.category.name,
    },
    subcategory: {
      index: 0,
      title: product.subCategory.name,
    },
    product: {
      slug: product.slug,
      title: product.name,
      description: product.description ?? "",
      image: gallery[0],
      gallery,
      colors: product.colors.map((color) => ({
        id: color.id,
        name: color.name[locale],
        hex: color.hex,
      })),
      features: (product.features ?? []).map((feature) => ({
        id: feature.id,
        name: feature.name[locale],
        icon: feature.icon,
      })),
      sizes: product.sizes,
    },
  };
}

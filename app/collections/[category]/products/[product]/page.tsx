"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import SiteFooter from "@/app/components/home/SiteFooter";
import SiteHeaderBar from "@/app/components/layout/SiteHeaderBar";
import { getShowcaseProduct } from "@/app/components/catalog/showcase-data";
import { useLanguage } from "@/app/components/providers/LanguageProvider";

export default function ShowcaseProductPage() {
  const { locale, t } = useLanguage();
  const params = useParams<{ category: string; product: string }>();
  const productView = getShowcaseProduct(locale, params.category, params.product);

  if (!productView) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(
    productView.product.colors[0]?.id ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    productView.product.sizes[0] ?? ""
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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

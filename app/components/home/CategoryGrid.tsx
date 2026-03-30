"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "../providers/LanguageProvider";

export default function CategoryGrid() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {t.home.categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group relative block overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={category.src}
                alt={category.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
              <div className="absolute inset-x-0 bottom-0 flex items-end p-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold tracking-[0.28em] text-white/80">
                    {category.title}
                  </p>
                  <h2 className="text-2xl font-bold text-white">
                    {category.description}
                  </h2>
                  <span className="inline-flex rounded-full border border-amber-100 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-amber-100 group-hover:text-slate-900">
                    {t.home.categoryCta}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

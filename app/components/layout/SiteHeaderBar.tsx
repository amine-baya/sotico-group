"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe2, Leaf, Menu, PenTool, X } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { useState } from "react";

import { getShowcaseCategories } from "../catalog/showcase-data";
import { certificates } from "../home/home-content";
import { useLanguage } from "../providers/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavigationMenuDemo } from "../navigation/NavigationMenu";

export default function SiteHeaderBar() {
  const { locale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const showcaseCategories = getShowcaseCategories();
  const promoItems = [
    {
      icon: PenTool,
      title: t.header.promoShippingTitle,
      text: t.header.promoShippingText,
    },
    {
      icon: Globe2,
      title: t.header.promoReturnsTitle,
      text: t.header.promoReturnsText,
    },
    {
      icon: Leaf,
      title: t.header.promoLogoTitle,
      text: t.header.promoLogoText,
    },
  ];

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="w-full border-b border-slate-100 bg-slate-50 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            {t.header.topBanner}
          </p>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-6 lg:pb-0">
        <div className="flex items-center gap-3">
          <button
            className="text-2xl text-[#0c437c] lg:hidden"
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>

          <button
            className="hidden cursor-pointer text-2xl font-bold lg:block"
            type="button"
          >
          <FaSearch />
          </button>
        </div>

        <Link href="/">
          <Image
            src="/logo.png"
            alt="Sotico logo"
            width={220}
            height={60}
            className="cursor-pointer lg:w-[250px]"
          />
        </Link>

        <button className="cursor-pointer text-2xl" type="button">
          <SlBasket />
        </button>
      </div>

      <div className="container mx-auto hidden justify-center pt-2 pb-3 text-lg font-semibold text-gray-800 lg:block">
        <NavigationMenuDemo />
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-5">
            <Link
              href="/#about-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-[#0c437c]"
            >
              {t.navigation.aboutUs}
            </Link>

            <details className="rounded-2xl bg-slate-50 px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0c437c]">
                {t.navigation.workwear}
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="mt-4 space-y-4">
                {showcaseCategories.map((category) => (
                  <div key={category.slug} className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                      {category.title[locale]}
                    </p>
                    <div className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.index}
                          href={`/collections/${category.slug}?sub=${subcategory.index}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm font-medium text-slate-700"
                        >
                          {subcategory.title[locale]}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <details className="rounded-2xl bg-slate-50 px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0c437c]">
                {t.navigation.standards}
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="mt-4 space-y-2">
                {certificates.map((certificate) => (
                  <Link
                    key={certificate.slug}
                    href={`/certificates/${certificate.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-medium text-slate-700"
                  >
                    {certificate.title}
                  </Link>
                ))}
              </div>
            </details>

            <details className="rounded-2xl bg-slate-50 px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0c437c]">
                {t.navigation.ppe}
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="mt-4 space-y-2 text-sm font-medium text-slate-700">
                <p>{t.navigation.backlog}</p>
                <p>{t.navigation.todo}</p>
                <p>{t.navigation.done}</p>
              </div>
            </details>

            <Link
              href="/#contact-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-[#0c437c]"
            >
              {t.navigation.contactUs}
            </Link>
          </div>
        </div>
      ) : null}

      <div className="bg-[#0c437c] py-4 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-8 text-center md:grid-cols-3">
          {promoItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={index === 1 ? "border-white/10 md:border-x" : ""}
              >
                <div className="mb-2 flex justify-center">
                  <span className="inline-flex rounded-full bg-white/10 p-2.5">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
                  {item.title}
                </p>
                {/* <p className="text-s underline underline-offset-4">
                  {item.text}
                </p> */}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

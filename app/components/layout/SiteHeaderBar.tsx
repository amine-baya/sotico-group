"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe2, Leaf, LogIn, Menu, PenTool, X } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { useEffect, useMemo, useRef, useState } from "react";

import { getShowcaseCategories } from "../catalog/showcase-data";
import { certificates } from "../home/home-content";
import { useWorkwearMenuCategories } from "../navigation/use-workwear-menu";
import { useLanguage } from "../providers/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavigationMenuDemo } from "../navigation/NavigationMenu";

export default function SiteHeaderBar() {
  const { locale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const showcaseCategories = getShowcaseCategories();
  const workwearCategories = useWorkwearMenuCategories();
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
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!trimmedQuery) {
      return {
        categories: [],
        products: [],
        certificates: [],
        sections: [],
      };
    }

    const categories = showcaseCategories
      .filter((category) => {
        const title = category.title[locale].toLowerCase();
        const description = category.description[locale].toLowerCase();

        return title.includes(trimmedQuery) || description.includes(trimmedQuery);
      })
      .slice(0, 4)
      .map((category) => ({
        key: category.slug,
        href: `/collections/${category.slug}`,
        label: category.title[locale],
      }));

    const products = showcaseCategories
      .flatMap((category) =>
        category.subcategories.flatMap((subcategory) =>
          subcategory.products.map((product) => ({
            key: `${category.slug}-${product.slug}`,
            href: `/collections/${category.slug}/products/${product.slug}`,
            label: product.title[locale],
            parent: subcategory.title[locale],
          }))
        )
      )
      .filter((product) => {
        return (
          product.label.toLowerCase().includes(trimmedQuery) ||
          product.parent.toLowerCase().includes(trimmedQuery)
        );
      })
      .slice(0, 6);

    const localizedCertificates = certificates
      .map((certificate) => ({
        key: certificate.slug,
        href: `/certificates/${certificate.slug}`,
        label: certificate.title,
      }))
      .filter((certificate) =>
        certificate.label.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, 3);

    const sections = [
      { key: "about", href: "/#about-section", label: t.navigation.search.about },
      {
        key: "contact",
        href: "/#contact-section",
        label: t.navigation.search.contact,
      },
    ].filter((section) => section.label.toLowerCase().includes(trimmedQuery));

    return {
      categories,
      products,
      certificates: localizedCertificates,
      sections,
    };
  }, [locale, showcaseCategories, t.navigation.search.about, t.navigation.search.contact, trimmedQuery]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        closeSearch();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  const hasResults =
    searchResults.categories.length > 0 ||
    searchResults.products.length > 0 ||
    searchResults.certificates.length > 0 ||
    searchResults.sections.length > 0;

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
            className="hidden cursor-pointer text-2xl font-bold text-[#0c437c] lg:block"
            type="button"
            onClick={() => {
              if (isSearchOpen) {
                closeSearch();
                return;
              }

              setIsSearchOpen(true);
            }}
            aria-label={
              isSearchOpen
                ? t.navigation.search.close
                : t.navigation.search.open
            }
            aria-expanded={isSearchOpen}
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

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#0c437c] transition hover:border-sky-200 hover:bg-sky-50"
            aria-label="Admin login"
            title="Admin login"
          >
            <LogIn className="h-5 w-5" />
          </Link>

          <button className="cursor-pointer text-2xl" type="button" aria-label="Cart">
            <SlBasket />
          </button>
        </div>
      </div>

      <div className="container mx-auto hidden justify-center pt-2 pb-3 text-lg font-semibold text-gray-800 lg:block">
        <NavigationMenuDemo />
      </div>

      {isSearchOpen ? (
        <div className="border-t border-slate-200 bg-white">
          <div
            ref={searchRef}
            className="mx-auto max-w-7xl px-4 py-5 lg:px-6"
          >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <FaSearch className="text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t.navigation.search.placeholder}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label={t.navigation.search.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!trimmedQuery ? (
                <p className="pt-4 text-sm text-slate-500">
                  {t.navigation.search.empty}
                </p>
              ) : !hasResults ? (
                <p className="pt-4 text-sm text-slate-500">
                  {t.navigation.search.noResults}
                </p>
              ) : (
                <div className="grid gap-4 pt-4 lg:grid-cols-2">
                  <SearchResultGroup
                    title={t.navigation.search.categories}
                    items={searchResults.categories}
                    onSelect={closeSearch}
                  />
                  <SearchResultGroup
                    title={t.navigation.search.products}
                    items={searchResults.products}
                    onSelect={closeSearch}
                  />
                  <SearchResultGroup
                    title={t.navigation.search.certificates}
                    items={searchResults.certificates}
                    onSelect={closeSearch}
                  />
                  <SearchResultGroup
                    title={t.navigation.search.sections}
                    items={searchResults.sections}
                    onSelect={closeSearch}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

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

            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 font-semibold text-[#0c437c]"
            >
              <span>Admin login</span>
              <LogIn className="h-4 w-4" />
            </Link>

            <details className="rounded-2xl bg-slate-50 px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0c437c]">
                {t.navigation.workwear}
                <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="mt-4 space-y-4">
                {workwearCategories.map((category) => (
                  <div key={category.slug} className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                      {category.title[locale]}
                    </p>
                    <div className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.slug}
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

type SearchResultItem = {
  key: string;
  href: string;
  label: string;
  parent?: string;
};

function SearchResultGroup({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: SearchResultItem[];
  onSelect: () => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={onSelect}
            className="block rounded-2xl px-3 py-2 transition hover:bg-slate-50"
          >
            <p className="text-sm font-semibold text-slate-800">{item.label}</p>
            {item.parent ? (
              <p className="text-xs text-slate-500">{item.parent}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

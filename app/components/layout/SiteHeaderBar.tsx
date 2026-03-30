"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";

import { useLanguage } from "../providers/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavigationMenuDemo } from "../navigation/NavigationMenu";

export default function SiteHeaderBar() {
  const { t } = useLanguage();

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

      <div className="container mx-auto flex items-center justify-between p-4 pb-0">
        <button className="cursor-pointer text-2xl font-bold" type="button">
          <FaSearch />
        </button>

        <Link href="/">
          <Image
            src="/logo.png"
            alt="Sotico logo"
            width={250}
            height={60}
            className="cursor-pointer"
          />
        </Link>

        <button className="cursor-pointer text-2xl" type="button">
          <SlBasket />
        </button>
      </div>

      <div className="container mx-auto justify-center pt-2 pb-3 text-lg font-semibold text-gray-800">
        <NavigationMenuDemo />
      </div>

      <div className="bg-[#0c437c] py-4 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-8 text-center md:grid-cols-3">
          <div>
            <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
              {t.header.promoShippingTitle}
            </p>
            <p className="text-s underline underline-offset-4">
              {t.header.promoShippingText}
            </p>
          </div>
          <div className="border-white/10 md:border-x">
            <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
              {t.header.promoReturnsTitle}
            </p>
            <p className="text-s underline underline-offset-4">
              {t.header.promoReturnsText}
            </p>
          </div>
          <div>
            <p className="mb-0.5 text-[15px] font-bold uppercase tracking-[0.2em]">
              {t.header.promoLogoTitle}
            </p>
            <p className="text-s underline underline-offset-4">
              {t.header.promoLogoText}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

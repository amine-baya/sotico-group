"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useLanguage } from "../providers/LanguageProvider";
import { certificates } from "../home/home-content";
import { useWorkwearMenuCategories } from "./use-workwear-menu";

export function NavigationMenuDemo() {
  const { t } = useLanguage();
  const workwearCategories = useWorkwearMenuCategories();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-center gap-14">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/#about-section"
              className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition"
            >
              {t.navigation.aboutUs}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition">
            {t.navigation.workwear}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="px-6 md:px-10">
            <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 py-4 lg:grid-cols-5">
              {workwearCategories.map((category) => (
                <NavigationCategoryItem
                  key={category.slug}
                  categorySlug={category.slug}
                  src={category.image}
                  subCategories={category.subcategories.map((subcategory) => ({
                    index: subcategory.index,
                    slug: subcategory.slug,
                    title: subcategory.title,
                  }))}
                  title={category.title}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <MenuPlaceholder label={t.navigation.ppe} />

        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition">
            {t.navigation.standards}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="px-6 md:px-10">
            <ul className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 py-6 md:grid-cols-3">
              {certificates.map((certificate) => (
                <li key={certificate.slug}>
                  <Link
                    href={`/certificates/${certificate.slug}`}
                    className="group block rounded-2xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative mx-auto mb-4 flex aspect-[4/3] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                      <Image
                        src={certificate.imageSrc}
                        alt={certificate.title}
                        fill
                        className="object-contain p-6"
                      />
                    </div>
                    <h3 className="text-lg font-bold tracking-[0.14em] text-[#0c437c]">
                      {certificate.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/#contact-section"
              className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition"
            >
              {t.navigation.contactUs}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type NavigationCategoryItemProps = {
  title: {
    en: string;
    fr: string;
  };
  categorySlug: string;
  src: string;
  subCategories: Array<{
    index: number;
    slug: string;
    title: {
      en: string;
      fr: string;
    };
  }>;
};

function NavigationCategoryItem({
  title,
  categorySlug,
  src,
  subCategories,
}: NavigationCategoryItemProps) {
  const { locale } = useLanguage();

  return (
    <li className="flex justify-center">
      <div className="w-full max-w-[250px]">
        <Image
          src={src}
          alt={title[locale]}
          width={250}
          height={100}
          className="h-40 rounded-md transition-transform duration-300 ease-in-out"
        />

        <h3 className="mt-3 font-bold tracking-[0.2em] text-[#0c437c]">
          {title[locale]}
        </h3>
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory.slug}
            href={`/collections/${categorySlug}?sub=${subCategory.index}`}
            className="mt-2 block text-[18px] font-semibold capitalize tracking-[0.1] text-[#18599f]"
          >
            {subCategory.title[locale]}
          </Link>
        ))}
      </div>
    </li>
  );
}

function MenuPlaceholder({ label }: { label: string }) {
  const { t } = useLanguage();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px]">
          <li>
            <NavigationMenuLink asChild>
              <Link href="#" className="flex-row items-center gap-2">
                <CircleAlertIcon />
                {t.navigation.backlog}
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#" className="flex-row items-center gap-2">
                <CircleDashedIcon />
                {t.navigation.todo}
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="#" className="flex-row items-center gap-2">
                <CircleCheckIcon />
                {t.navigation.done}
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

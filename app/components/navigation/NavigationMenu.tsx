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

export function NavigationMenuDemo() {
  const { t } = useLanguage();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-center gap-14">
        <NavigationMenuItem>
          <NavigationMenuLink>
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
              {t.home.categories.map((category) => (
                <NavigationCategoryItem
                  key={category.title}
                  href={category.href}
                  src={category.src}
                  subCategories={category.subCategories}
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
          <NavigationMenuLink>
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
  title: string;
  href: string;
  src: string;
  subCategories: string[];
};

function NavigationCategoryItem({
  title,
  href,
  src,
  subCategories,
}: NavigationCategoryItemProps) {
  return (
    <li className="flex justify-center">
      <div className="w-full max-w-[250px]">
        <Image
          src={src}
          alt={title}
          width={250}
          height={100}
          className="h-40 rounded-md transition-transform duration-300 ease-in-out"
        />

        <h3 className="mt-3 font-bold tracking-[0.2em] text-[#0c437c]">
          {title}
        </h3>
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory}
            href={href}
            className="mt-2 block text-[18px] font-semibold capitalize tracking-[0.1] text-[#18599f]"
          >
            {subCategory}
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
            <NavigationMenuLink
              render={
                <Link href="#" className="flex-row items-center gap-2">
                  <CircleAlertIcon />
                  {t.navigation.backlog}
                </Link>
              }
            />
            <NavigationMenuLink
              render={
                <Link href="#" className="flex-row items-center gap-2">
                  <CircleDashedIcon />
                  {t.navigation.todo}
                </Link>
              }
            />
            <NavigationMenuLink
              render={
                <Link href="#" className="flex-row items-center gap-2">
                  <CircleCheckIcon />
                  {t.navigation.done}
                </Link>
              }
            />
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

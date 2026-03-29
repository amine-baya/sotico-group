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

import { homeCategories } from "../home/home-content";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-center gap-14">
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link
              href="#"
              className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition"
            >
              About Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition">
            Workwear
          </NavigationMenuTrigger>
          <NavigationMenuContent className="px-6 md:px-10">
            <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 py-4 lg:grid-cols-5">
              {homeCategories.map((category) => (
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

        <MenuPlaceholder label="PPE" />
        <MenuPlaceholder label="Normes" />

        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link
              href="#"
              className="cursor-pointer uppercase tracking-[0.2em] text-[#0c437c] transition"
            >
              Contact Us
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
                  Backlog
                </Link>
              }
            />
            <NavigationMenuLink
              render={
                <Link href="#" className="flex-row items-center gap-2">
                  <CircleDashedIcon />
                  To Do
                </Link>
              }
            />
            <NavigationMenuLink
              render={
                <Link href="#" className="flex-row items-center gap-2">
                  <CircleCheckIcon />
                  Done
                </Link>
              }
            />
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

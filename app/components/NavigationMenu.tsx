"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

const categories: { title: string; src:string; href: string; description: string, subCategories: Array }[] = [
  {
    title: "HEALTHCARE",
    src: "/healthcare.png",
    href: "/healthcare",
    description: "Premium medical uniforms designed for comfort, hygiene, and durability.",
    subCategories: [
      "Women's Nurses Tunics",
      "Men's Tunics",
      "Healthcare Scrubs",
      "Healthcare Trousers",
      "Nurse Dresses",
      "Maternity Tunics"
    ]
  },
  {
    title: "INDUSTRY",
    src: "/industry.png",
    href: "/industry-construction",
    description: "Heavy-duty workwear built for safety, protection, and performance in demanding environments.",
    subCategories: [
      "Coveralls",
      "Work Jackets",
      "Work Trousers",
      "High-Visibility Clothing",
      "Flame-Resistant Clothing",
      "Waterproof Workwear"
    ]
  },
  {
    title: "HOSPITALITY",
    src: "/hospitality.png",
    href: "/hospitality",
    description: "Professional uniforms for chefs, kitchen staff, and service teams.",
    subCategories: [
      "Chef Jackets",
      "Chef Trousers",
      "Aprons",
      "Kitchen Uniforms",
      "Waiter & Waitress Uniforms",
      "Catering Uniforms"
    ]
  },
  {
    title: "SERVICE",
    src: "/corporate.png",
    href: "/corporate",
    description: "Elegant uniforms for office, retail, and customer-facing professionals.",
    subCategories: [
      "Office Uniforms",
      "Reception Staff Uniforms",
      "Retail Staff Uniforms",
      "Security Uniforms",
      "Airline Staff Uniforms",
      "Customer Service Apparel"
    ]
  },
  {
    title: "CLEANING",
    src: "/cleaning.png",
    href: "/cleaning-services",
    description: "Durable and practical clothing for cleaning and maintenance professionals.",
    subCategories: [
      "Cleaning Staff Uniforms",
      "Housekeeping Uniforms",
      "Janitorial Workwear",
      "Industrial Laundry Clothing",
      "Maintenance Uniforms",
      "Protective Overalls"
    ]
  }
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-14 justify-center">
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link href="#" className="uppercase tracking-[0.2em] text-[#0c437c] cursor-pointer transition " >
                About Us
            </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase tracking-[0.2em] text-[#0c437c] cursor-pointer transition">
              Workwear
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid grid-cols-[repeat(auto-fit,250px)] justify-center gap-6 py-4 w-[1500px]">
                  {categories.map((category) => (
                    <ListItem
                      key={category.title}
                      title={category.title}
                      href={category.href}
                      src={category.src}
                      subCategories={category.subCategories}
                    >
                      {category.description}
                    </ListItem>
                  ))}
                </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase tracking-[0.2em] text-[#0c437c] cursor-pointer transition">PPE</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleAlertIcon />Backlog</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleDashedIcon />To Do</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleCheckIcon />Done</Link>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase tracking-[0.2em] text-[#0c437c] cursor-pointer transition">Normes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleAlertIcon />Backlog</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleDashedIcon />To Do</Link>} />
                <NavigationMenuLink render={<Link href="#" className="flex-row items-center gap-2"><CircleCheckIcon />Done</Link>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link href="#" className="uppercase tracking-[0.2em] text-[#0c437c] cursor-pointer transition " >
                Contact Us
            </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({ title, children, href, src, subCategories }) {
  return (
    <li className="flex justify-center">
      {/* Fixed-width column (same as image width) */}
      <div className="w-[250px]">
        
        {/* Image */}
        <Image
          src={src}
          alt={title}
          width={250}
          height={100}
          className="h-40 rounded-md transition-transform duration-300 ease-in-out"
        />

        {/* Title */}
        <h3 className="mt-3 text-[#0c437c] font-bold tracking-[0.2em]">
          {title}
        </h3>
        {subCategories.map((sub) => (
          <Link href={sub} className="mt-2 block text-[18px] font-semibold capitalize tracking-[0.1] text-[#18599f] " >
            {sub}
          </Link>
        ))}

      </div>
    </li>
  )
}

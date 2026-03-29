export type HomeCategory = {
  title: string;
  src: string;
  href: string;
  description: string;
  subCategories: string[];
};

export type PartnerLogo = {
  src: string;
  alt: string;
};

export const homeCategories: HomeCategory[] = [
  {
    title: "HEALTHCARE",
    src: "/healthcare.png",
    href: "/healthcare",
    description:
      "Premium medical uniforms designed for comfort, hygiene, and durability.",
    subCategories: [
      "Women's Nurses Tunics",
      "Men's Tunics",
      "Healthcare Scrubs",
      "Healthcare Trousers",
      "Nurse Dresses",
      "Maternity Tunics",
    ],
  },
  {
    title: "INDUSTRY",
    src: "/industry.png",
    href: "/industry-construction",
    description:
      "Heavy-duty workwear built for safety, protection, and performance in demanding environments.",
    subCategories: [
      "Coveralls",
      "Work Jackets",
      "Work Trousers",
      "High-Visibility Clothing",
      "Flame-Resistant Clothing",
      "Waterproof Workwear",
    ],
  },
  {
    title: "HOSPITALITY",
    src: "/hospitality.png",
    href: "/hospitality",
    description:
      "Professional uniforms for chefs, kitchen staff, and service teams.",
    subCategories: [
      "Chef Jackets",
      "Chef Trousers",
      "Aprons",
      "Kitchen Uniforms",
      "Waiter & Waitress Uniforms",
      "Catering Uniforms",
    ],
  },
  {
    title: "SERVICE",
    src: "/corporate.png",
    href: "/corporate",
    description:
      "Elegant uniforms for office, retail, and customer-facing professionals.",
    subCategories: [
      "Office Uniforms",
      "Reception Staff Uniforms",
      "Retail Staff Uniforms",
      "Security Uniforms",
      "Airline Staff Uniforms",
      "Customer Service Apparel",
    ],
  },
  {
    title: "CLEANING",
    src: "/cleaning.png",
    href: "/cleaning-services",
    description:
      "Durable and practical clothing for cleaning and maintenance professionals.",
    subCategories: [
      "Cleaning Staff Uniforms",
      "Housekeeping Uniforms",
      "Janitorial Workwear",
      "Industrial Laundry Clothing",
      "Maintenance Uniforms",
      "Protective Overalls",
    ],
  },
];

export const partnerLogos: PartnerLogo[] = [
  { src: "/images.jpeg", alt: "Company Logo 1" },
  { src: "/images.jpeg", alt: "Company Logo 2" },
  { src: "/images.jpeg", alt: "Company Logo 3" },
  { src: "/images.jpeg", alt: "Company Logo 4" },
  { src: "/images.jpeg", alt: "Company Logo 5" },
];

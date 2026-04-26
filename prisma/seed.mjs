import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

const defaultCategories = [
  {
    name: "Healthcare",
    imageUrl: "/healthcare.png",
    subCategories: ["Scrubs", "Lab coats", "Patient wear"],
  },
  {
    name: "Industry",
    imageUrl: "/industry.png",
    subCategories: ["Work jackets", "Work pants", "Safety vests"],
  },
  {
    name: "Hospitality",
    imageUrl: "/hospitality.png",
    subCategories: ["Chef wear", "Aprons", "Front desk uniforms"],
  },
  {
    name: "Service",
    imageUrl: "/corporate.png",
    subCategories: ["Corporate uniforms", "Security uniforms", "Retail wear"],
  },
  {
    name: "Cleaning",
    imageUrl: "/cleaning.png",
    subCategories: ["Housekeeping", "Maintenance", "Protective sets"],
  },
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@sotico-group.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminName = process.env.ADMIN_NAME ?? "Sotico Admin";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash,
    },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: "ADMIN",
    },
  });

  for (const category of defaultCategories) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: slugify(category.name) },
      update: { name: category.name, imageUrl: category.imageUrl },
      create: {
        name: category.name,
        slug: slugify(category.name),
        imageUrl: category.imageUrl,
      },
    });

    for (const subCategoryName of category.subCategories) {
      await prisma.subCategory.upsert({
        where: {
          categoryId_slug: {
            categoryId: savedCategory.id,
            slug: slugify(subCategoryName),
          },
        },
        update: {
          name: subCategoryName,
        },
        create: {
          name: subCategoryName,
          slug: slugify(subCategoryName),
          categoryId: savedCategory.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

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
  "Healthcare",
  "Industry",
  "Hospitality",
  "Service",
  "Cleaning",
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

  for (const categoryName of defaultCategories) {
    await prisma.category.upsert({
      where: { slug: slugify(categoryName) },
      update: { name: categoryName },
      create: {
        name: categoryName,
        slug: slugify(categoryName),
      },
    });
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

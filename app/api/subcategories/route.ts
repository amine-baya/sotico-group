import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const createSubCategorySchema = z.object({
  name: z.string().min(2).max(80),
  categoryId: z.string().min(1),
});

export async function GET() {
  const subCategories = await prisma.subCategory.findMany({
    orderBy: [{ category: { name: "asc" } }, { name: "asc" }],
    include: {
      category: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return NextResponse.json(subCategories);
}

export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = createSubCategorySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "Invalid sub-category payload" },
      { status: 400 },
    );
  }

  const subCategory = await prisma.subCategory.create({
    data: {
      name: parsedBody.data.name,
      slug: slugify(parsedBody.data.name),
      categoryId: parsedBody.data.categoryId,
    },
    include: {
      category: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return NextResponse.json(subCategory, { status: 201 });
}

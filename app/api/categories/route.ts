import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/admin-auth";

const createCategorySchema = z.object({
  name: z.string().min(2).max(80),
  imageUrl: z.string().url().optional().nullable(),
});

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      subCategories: {
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      },
      _count: {
        select: {
          subCategories: true,
        },
      },
    },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = createCategorySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid category payload" }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: {
      name: parsedBody.data.name,
      slug: slugify(parsedBody.data.name),
      imageUrl: parsedBody.data.imageUrl ?? null,
    },
    include: {
      subCategories: {
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      },
      _count: {
        select: {
          subCategories: true,
        },
      },
    },
  });

  return NextResponse.json(category, { status: 201 });
}

import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/admin-auth";

const colorSchema = z.object({
  id: z.string().min(1),
  name: z.object({
    en: z.string().min(1),
    fr: z.string().min(1),
  }),
  hex: z.string().min(4),
});

const productSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(4000).optional().default(""),
  price: z.coerce.number().nonnegative().nullable().optional(),
  imageUrls: z.array(z.string().url()).length(3),
  categoryId: z.string().min(1),
  sizes: z.array(z.string().min(1)).default([]),
  colors: z.array(colorSchema).default([]),
});

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = productSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid product payload" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name: parsedBody.data.name,
      slug: `${slugify(parsedBody.data.name)}-${Date.now()}`,
      description: parsedBody.data.description,
      price: parsedBody.data.price ?? null,
      imageUrls: parsedBody.data.imageUrls,
      categoryId: parsedBody.data.categoryId,
      sizes: parsedBody.data.sizes,
      colors: parsedBody.data.colors,
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(product, { status: 201 });
}

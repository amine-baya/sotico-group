import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { isVercelBlobUrl } from "@/lib/blob";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const colorSchema = z.object({
  id: z.string().min(1),
  name: z.object({
    en: z.string().min(1),
    fr: z.string().min(1),
  }),
  hex: z.string().min(4),
});

const updateProductSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(4000).optional().default(""),
  price: z.coerce.number().nonnegative().nullable().optional(),
  imageUrl: z.string().url().or(z.literal("")).optional().default(""),
  categoryId: z.string().min(1),
  sizes: z.array(z.string().min(1)).default([]),
  colors: z.array(colorSchema).default([]),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = updateProductSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid product payload" }, { status: 400 });
  }

  const { id } = await params;

  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: parsedBody.data.name,
      description: parsedBody.data.description,
      price: parsedBody.data.price ?? null,
      imageUrl: parsedBody.data.imageUrl || null,
      categoryId: parsedBody.data.categoryId,
      sizes: parsedBody.data.sizes,
      colors: parsedBody.data.colors,
    },
    include: {
      category: true,
    },
  });

  if (
    existingProduct.imageUrl &&
    existingProduct.imageUrl !== product.imageUrl &&
    isVercelBlobUrl(existingProduct.imageUrl)
  ) {
    await del(existingProduct.imageUrl);
  }

  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const { id } = await params;

  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  await prisma.product.delete({
    where: { id },
  });

  const imageUrl = existingProduct.imageUrl;

  if (imageUrl && isVercelBlobUrl(imageUrl)) {
    await del(imageUrl);
  }

  return NextResponse.json({ success: true });
}

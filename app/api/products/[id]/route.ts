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
  imageUrls: z.array(z.string().url()).length(3),
  categoryId: z.string().min(1),
  sizes: z.array(z.string().min(1)).default([]),
  colors: z.array(colorSchema).default([]),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
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
  { params }: { params: Promise<{ id: string }> },
) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = updateProductSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "Invalid product payload" },
      { status: 400 },
    );
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
      imageUrls: parsedBody.data.imageUrls,
      categoryId: parsedBody.data.categoryId,
      sizes: parsedBody.data.sizes,
      colors: parsedBody.data.colors,
    },
    include: {
      category: true,
    },
  });

  const removedBlobUrls = existingProduct.imageUrls.filter(
    (url: string) => !product.imageUrls.includes(url) && isVercelBlobUrl(url)
  );

  if (removedBlobUrls.length > 0) {
    await del(removedBlobUrls);
  }

  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
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

  const blobUrls = existingProduct.imageUrls.filter((url: string) =>
    isVercelBlobUrl(url),
  );

  if (blobUrls.length > 0) {
    await del(blobUrls);
  }

  return NextResponse.json({ success: true });
}

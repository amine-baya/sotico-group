import { NextResponse } from "next/server";
import { z } from "zod";
import { del } from "@vercel/blob";

import { requireAdmin } from "@/lib/admin-auth";
import { isVercelBlobUrl } from "@/lib/blob";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const updateSubCategorySchema = z.object({
  name: z.string().min(2).max(80),
  categoryId: z.string().min(1),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = updateSubCategorySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "Invalid sub-category payload" },
      { status: 400 },
    );
  }

  const { id } = await params;

  const subCategory = await prisma.subCategory.update({
    where: { id },
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

  return NextResponse.json(subCategory);
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

  const products = await prisma.product.findMany({
    where: { subCategoryId: id },
    select: {
      imageUrls: true,
    },
  });

  await prisma.subCategory.delete({
    where: { id },
  });

  const blobUrls = products
    .flatMap((product) => product.imageUrls)
    .filter((url) => isVercelBlobUrl(url));

  if (blobUrls.length > 0) {
    await del(blobUrls);
  }

  return NextResponse.json({ success: true });
}

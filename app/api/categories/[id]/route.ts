import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { requireAdmin } from "@/lib/admin-auth";

const updateCategorySchema = z.object({
  name: z.string().min(2).max(80),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = updateCategorySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid category payload" }, { status: 400 });
  }

  const { id } = await params;

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: parsedBody.data.name,
      slug: slugify(parsedBody.data.name),
    },
  });

  return NextResponse.json(category);
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

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

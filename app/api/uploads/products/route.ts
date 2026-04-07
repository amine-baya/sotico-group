import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";

export async function POST(request: Request) {
  const { errorResponse } = await requireAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Missing image file" }, { status: 400 });
  }

  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "product-image";
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `products/${Date.now()}-${safeName}.${extension}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return NextResponse.json({ url: blob.url }, { status: 201 });
}

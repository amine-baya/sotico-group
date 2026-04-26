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
    return NextResponse.json(
      { message: "Missing image file" },
      { status: 400 },
    );
  }

  const safeName =
    slugify(file.name.replace(/\.[^.]+$/, "")) || "category-image";
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `categories/${Date.now()}-${safeName}.${extension}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ url: blob.url }, { status: 201 });
}

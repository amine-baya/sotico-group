import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireSuperAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(2).max(80).optional().default(""),
});

export async function GET() {
  const { errorResponse } = await requireSuperAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const admins = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json(admins);
}

export async function POST(request: Request) {
  const { errorResponse } = await requireSuperAdmin();

  if (errorResponse) {
    return errorResponse;
  }

  const body = await request.json();
  const parsedBody = createAdminSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid admin payload" }, { status: 400 });
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: parsedBody.data.email },
    select: { id: true },
  });

  if (existingAdmin) {
    return NextResponse.json({ message: "An admin with this email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(parsedBody.data.password, 10);

  const admin = await prisma.user.create({
    data: {
      email: parsedBody.data.email,
      name: parsedBody.data.name.trim() || null,
      passwordHash,
      role: "ADMIN",
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json(admin, { status: 201 });
}

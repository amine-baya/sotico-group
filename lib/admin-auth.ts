import { NextResponse } from "next/server";

import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return {
      session: null,
      errorResponse: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    session,
    errorResponse: null,
  };
}

export async function requireSuperAdmin() {
  const { session, errorResponse } = await requireAdmin();

  if (errorResponse) {
    return { session, errorResponse };
  }

  if (session?.user.role !== "SUPER_ADMIN") {
    return {
      session,
      errorResponse: NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return {
    session,
    errorResponse: null,
  };
}

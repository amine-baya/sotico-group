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

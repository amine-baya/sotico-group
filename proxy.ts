export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/products/:path*", "/api/products/:path*"],
};

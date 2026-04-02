import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sotico-group.vercel.app";

const routes = [
  "",
  "/about",
  "/products",
  "/collections/healthcare",
  "/collections/industry-construction",
  "/collections/hospitality",
  "/collections/corporate",
  "/collections/cleaning-services",
  "/certificates/iso-9001",
  "/certificates/iso-14001",
  "/certificates/iso-45001",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

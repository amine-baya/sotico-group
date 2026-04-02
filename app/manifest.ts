import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SOTICO Group",
    short_name: "SOTICO",
    description:
      "Professional workwear and uniform solutions for healthcare, industry, hospitality, service, and cleaning sectors.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0c437c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

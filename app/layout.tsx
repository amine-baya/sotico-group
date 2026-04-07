import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "./components/providers/AuthProvider";
import { LanguageProvider } from "./components/providers/LanguageProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sotico-group.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SOTICO Group | Professional Workwear & Uniform Solutions",
    template: "%s | SOTICO Group",
  },
  description:
    "SOTICO Group designs and manufactures professional uniforms, workwear, and tailored clothing solutions for healthcare, industry, hospitality, service, and cleaning sectors.",
  keywords: [
    "workwear",
    "professional uniforms",
    "industrial clothing",
    "healthcare uniforms",
    "hospitality uniforms",
    "PPE",
    "Sotico Group",
  ],
  applicationName: "SOTICO Group",
  category: "business",
  creator: "SOTICO Group",
  publisher: "SOTICO Group",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SOTICO Group",
    title: "SOTICO Group | Professional Workwear & Uniform Solutions",
    description:
      "Discover premium professional uniforms and custom workwear solutions built for comfort, safety, and performance.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "SOTICO Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOTICO Group | Professional Workwear & Uniform Solutions",
    description:
      "Premium workwear, uniforms, and custom clothing solutions for professionals.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/logo.png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.ts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

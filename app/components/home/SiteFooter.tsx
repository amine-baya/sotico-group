"use client";

import Link from "next/link";

import { useLanguage } from "../providers/LanguageProvider";

const phoneHref = "tel:+21673288533";
const primaryEmailHref = "mailto:contact@soticogroup.com";
const secondaryEmailHref = "mailto:mk@soticogroup.com";
const mapsHref =
  "https://www.google.com/maps/@35.6838183,10.578252,153m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";
const FacebookIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const socialLinks = [
  {
    href: "https://sotico-group.com",
    label: "LinkedIn",
    icon: "🌐",
  },
  {
    href: "https://www.facebook.com/319446832109143",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/sotico_group", // Placeholder Instagram URL
    label: "Instagram",
    icon: InstagramIcon,
  },
];


export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 py-14 text-gray-300">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">Sotico</h3>
          <p className="leading-relaxed text-gray-400">
            {t.home.footer.companyDescription}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">
            {t.home.footer.quickLinks}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link className="transition hover:text-white" href="/">
                {t.home.footer.home}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/products">
                {t.home.footer.shop}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/#about-section">
                {t.home.footer.about}
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/#contact-section">
                {t.home.footer.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">
            {t.home.footer.contactTitle}
          </h4>
          <ul className="space-y-2">
            <li>
              <a className="transition hover:text-white" href={phoneHref}>
                📞 (+216) 73 288 533
              </a>
            </li>
            <li className="space-x-2">
              <a className="transition hover:text-white" href={primaryEmailHref}>
                📧 contact@soticogroup.com
              </a>
              <span className="text-gray-500 pointer">/</span>
              <a className="transition hover:text-white" href={secondaryEmailHref}>
                mk@soticogroup.com
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-white"
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                📍 GP1, Route de Sfax Z.I. Beni Rabiaa 4015 M&apos;saken - Tunisie
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">
            {t.home.footer.followUs}
          </h4>
          <div className="flex gap-4 text-2xl">
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.label}
                href={socialLink.href}
                className="transition hover:text-white"
                target="_blank"
                rel="noreferrer"
                aria-label={socialLink.label}
              >
                {socialLink.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Sotico. {t.home.footer.copyright}
      </div>
    </footer>
  );
}

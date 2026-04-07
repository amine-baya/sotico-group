"use client";

import Link from "next/link";

import { useLanguage } from "../providers/LanguageProvider";

const phoneHref = "tel:+21673288533";
const primaryEmailHref = "mailto:contact@soticogroup.com";
const secondaryEmailHref = "mailto:mk@soticogroup.com";
const mapsHref =
  "https://www.google.com/maps/@35.6838183,10.578252,153m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D";
const socialLinks = [
  {
    href: "https://sotico-group.com",
    label: "LinkedIn",
    icon: "🌐",
  },
  {
    href: "https://www.facebook.com/319446832109143",
    label: "Facebook",
    icon: "📘",
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

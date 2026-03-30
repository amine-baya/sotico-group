"use client";

import Link from "next/link";

import { useLanguage } from "../providers/LanguageProvider";

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
            <li>📞 (+216) 73 288 533/544</li>
            <li>📧 mk@soticogroup.com / contact@soticogroup.com</li>
            <li>📍 GP1, Route de Sfax Z.I. BeniRabiaa 4015 M&apos;saken - Tunisie</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl font-semibold text-white">
            {t.home.footer.followUs}
          </h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="transition hover:text-white">
              🌐
            </a>
            <a href="#" className="transition hover:text-white">
              📘
            </a>
            <a href="#" className="transition hover:text-white">
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Sotico. {t.home.footer.copyright}
      </div>
    </footer>
  );
}

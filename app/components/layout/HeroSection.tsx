"use client";

import Link from "next/link";

import { useLanguage } from "../providers/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center overflow-hidden bg-white pt-0">
      <div className="h-[90vh] w-full">
        <div className="absolute inset-0 grid h-full grid-cols-1 lg:grid-cols-12">
          <div className="hidden bg-background lg:col-span-5 lg:block" />
          <div className="relative col-span-12 h-full lg:col-span-7">
            {/* Remote marketing image kept as a plain img until a Next image host is configured. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover"
              alt={t.header.heroImageAlt}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyGv9ZF64nFYFvzBixhs__AHwhrcLuXgoFBsO5cW4vjgpD5CtUxA-drguHiBtwK__0W6thwFwXYrVrYeXvz51MvpxMA4PEKB-wbdkEpC8ZDhrMWCPZco5beJEKutOBce4CWk0i58o3ZAwRJ1hFtT801SohhWnRg_y0NWnWLOBQ-jtEqDMJYq8r2M45SAc4uXhs1wgAsVsmw73qYEJG91R7iltat_2xb6gs1_aQRlxB8VGs-xaX2WL2CG0Tl_E2Xsa0CNMrgzaNzxc"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent lg:from-background lg:via-background/40" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-multiply" />
          </div>
        </div>

        <div className="relative z-10 ml-[15%] w-full max-w-7xl pb-20 pt-50">
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="mb-4 text-sm font-bold tracking-[0.2em] text-[#0c437c]">
                {t.header.heroEyebrow}
              </p>
              <h1 className="mb-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0c437c] md:text-6xl lg:text-7xl">
                {t.header.heroTitle}
              </h1>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/collections/healthcare"
                  className="editorial-gradient flex items-center justify-between rounded-md bg-[#0c437c] px-8 py-4 font-semibold text-white transition-all hover:shadow-xl hover:shadow-primary/20"
                >
                  <span>{t.header.heroPrimaryCta}</span>
                  <span className="ml-4">→</span>
                </Link>
                <button
                  className="rounded-md bg-[#aebebb] px-8 py-4 font-semibold text-white transition-colors hover:bg-slate-500"
                  type="button"
                >
                  {t.header.heroSecondaryCta}
                </button>
              </div>

              <div className="mt-12 inline-block rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-xl">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                  {t.header.qualityTitle}
                </p>
                <p className="text-sm font-medium text-on-surface-variant">
                  {t.header.qualityText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

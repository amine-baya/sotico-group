"use client";

import Image from "next/image";

import SiteFooter from "../components/home/SiteFooter";
import SiteHeaderBar from "../components/layout/SiteHeaderBar";
import { useLanguage } from "../components/providers/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <SiteHeaderBar />

      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(12,67,124,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#0c437c]">
              {t.aboutPage.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight text-[#0c437c] md:text-6xl">
              {t.aboutPage.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
              {t.aboutPage.intro}
            </p>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src="/company.jpg"
              alt="Sotico company history"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c437c]/45 to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#0c437c] p-10 text-white shadow-xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-amber-300">
              {t.aboutPage.storyTitle}
            </p>
            <h2 className="mb-6 text-3xl font-bold">
              {t.home.about.titlePrefix} {t.home.about.titleAccent}
            </h2>
            <p className="mb-4 leading-relaxed text-white/85">
              {t.home.about.paragraphOne}
            </p>
            <p className="leading-relaxed text-white/85">
              {t.home.about.paragraphTwo}
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              Sotico
            </p>
            <h2 className="mb-6 text-3xl font-bold text-[#0c437c]">
              {t.home.footer.about}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              {t.home.footer.companyDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
              {t.aboutPage.eyebrow}
            </p>
            <h2 className="text-4xl font-black text-[#0c437c] md:text-5xl">
              {t.aboutPage.timelineTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
              {t.aboutPage.timelineIntro}
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#0c437c] via-slate-300 to-transparent md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {t.aboutPage.timeline.map((step, index) => {
                const isRight = index % 2 === 1;

                return (
                  <div
                    key={step.year}
                    className={[
                      "relative grid items-start gap-6 md:grid-cols-2",
                      isRight ? "md:[&>*:first-child]:order-2" : "",
                    ].join(" ")}
                  >
                    <div className={isRight ? "md:pl-12" : "md:pr-12"}>
                      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-amber-500">
                          {step.year}
                        </p>
                        <h3 className="mb-3 text-2xl font-bold text-[#0c437c]">
                          {step.title}
                        </h3>
                        <p className="leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative hidden h-full md:block">
                      <div className="absolute left-1/2 top-6 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white bg-[#0c437c] shadow-lg" />
                    </div>

                    <div className="absolute left-6 top-6 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-white bg-[#0c437c] shadow-lg md:hidden" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

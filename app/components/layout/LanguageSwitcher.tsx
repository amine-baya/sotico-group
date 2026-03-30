"use client";

import { Locale } from "../i18n/translations";
import { useLanguage } from "../providers/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-slate-300 bg-white p-1 shadow-sm">
      {(["en", "fr"] as Locale[]).map((item) => {
        const isActive = locale === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={[
              "rounded-full px-3 py-1 text-xs font-bold tracking-[0.18em] transition",
              isActive
                ? "bg-[#0c437c] text-white"
                : "text-slate-600 hover:bg-slate-100",
            ].join(" ")}
          >
            {t.languageSwitcher[item]}
          </button>
        );
      })}
    </div>
  );
}

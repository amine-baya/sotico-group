"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  Locale,
  TranslationDictionary,
  locales,
  translations,
} from "../i18n/translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getClientLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem("sotico-locale", nextLocale);
    window.dispatchEvent(new Event("sotico-locale-change"));
  };

  useEffect(() => {
    window.localStorage.setItem("sotico-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}

export { locales };

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("sotico-locale-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sotico-locale-change", callback);
  };
}

function getClientLocaleSnapshot(): Locale {
  const storedLocale = window.localStorage.getItem("sotico-locale");

  if (storedLocale === "en" || storedLocale === "fr") {
    return storedLocale;
  }

  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

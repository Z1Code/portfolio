"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  translations,
  defaultLocale,
  type Translations,
} from "./translations";

interface LanguageContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";

function detectLocale(): string {
  if (typeof window === "undefined") return defaultLocale;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && translations[stored]) return stored;

  const browserLang = navigator.language.split("-")[0];
  if (translations[browserLang]) return browserLang;

  return defaultLocale;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocaleState(newLocale);
    }
  };

  const t = translations[locale] ?? translations[defaultLocale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}

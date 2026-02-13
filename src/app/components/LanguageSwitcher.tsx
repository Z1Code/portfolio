"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { languageNames } from "../i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-2 text-white/60 ring-1 ring-white/[0.08] transition hover:bg-white/[0.08] hover:text-white"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wide">
          {locale}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="glass absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl p-1.5"
          >
            <div className="relative z-10">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left font-[var(--font-inter)] text-sm transition ${
                  code === locale
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span className="w-6 text-xs font-bold uppercase tracking-wider text-white/40">
                  {code}
                </span>
                <span className="flex-1">{name}</span>
                {code === locale && (
                  <Check className="h-3.5 w-3.5 text-amber-400" />
                )}
              </button>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

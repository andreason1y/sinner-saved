"use client";

import { motion } from "framer-motion";
import { useLocale } from "./LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n/dictionary";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex h-9 items-center rounded-full border border-ink-900/10 bg-white/60 p-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-200"
    >
      {(LOCALES as readonly Locale[]).map((l) => {
        const isActive = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            className={`relative isolate z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              isActive
                ? "text-parchment dark:text-ink-950"
                : "hover:text-ink-900 dark:hover:text-ink-50"
            }`}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="locale-toggle-bg"
                className="absolute inset-0 -z-10 rounded-full bg-ink-900 dark:bg-ink-50"
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 28,
                  mass: 0.5,
                }}
              />
            )}
            <span>{l.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

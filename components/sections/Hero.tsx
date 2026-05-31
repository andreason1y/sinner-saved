"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function Hero() {
  const { t, locale } = useLocale();

  const dateLabel = new Date().toLocaleDateString(
    locale === "en" ? "en-US" : "id-ID",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  // One quiet, complete sentence — no colour-on-the-last-word trick, no
  // word-by-word choreography. The whole block settles in once.
  const headline =
    locale === "en"
      ? "Thinking slowly, reading Scripture with honesty."
      : "Berpikir perlahan, membaca Alkitab dengan jujur.";

  const verse =
    locale === "en"
      ? "“While we were still sinners, Christ died for us.” — Romans 5:8"
      : "“Ketika kita masih berdosa, Kristus telah mati untuk kita.” — Roma 5:8";

  return (
    <section className="relative border-b border-ink-900/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-14 lg:px-8 sm:pt-24 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Standfirst — plain, no badge, no pulsing dot */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs uppercase tracking-[0.28em] text-ink-500 dark:text-ink-400">
            <span>{dateLabel}</span>
            <span className="text-ink-300 dark:text-ink-600">—</span>
            <span>{t.hero.tagline}</span>
          </div>

          <h1 className="serif-display mt-7 max-w-4xl text-balance text-4xl leading-[1.08] text-ink-900 dark:text-ink-50 sm:text-6xl sm:leading-[1.05]">
            {headline}
          </h1>

          <div className="mt-10 grid gap-8 border-t border-ink-900/10 pt-8 dark:border-white/10 sm:grid-cols-12 sm:gap-12">
            <p className="text-base leading-relaxed text-ink-700 dark:text-ink-200 sm:col-span-7">
              {t.hero.intro.split("SinnerSaved").map((part, i) => (
                <span key={i}>
                  {i > 0 && (
                    <span className="font-medium text-ink-900 dark:text-ink-50">
                      SinnerSaved
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>
            <div className="flex flex-col items-start gap-3 sm:col-span-4 sm:col-start-9">
              <a
                href="#latest"
                className="link-underline text-sm font-medium text-ink-900 dark:text-ink-50"
              >
                {t.hero.cta}
              </a>
              <a
                href="#ruang-alkitab"
                className="link-underline text-sm text-ink-600 dark:text-ink-300"
              >
                {t.hero.explore}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* A single, still verse — set like a colophon, not a scrolling ticker */}
      <div className="border-t border-ink-900/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
          <p className="serif-display text-sm italic text-ink-500 dark:text-ink-400">
            {verse}
          </p>
        </div>
      </div>
    </section>
  );
}

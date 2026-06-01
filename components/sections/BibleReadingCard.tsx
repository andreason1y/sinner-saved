"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { getDayOfYear, getDayReading } from "@/lib/bible-reading-plan";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function BibleReadingCard() {
  const { t, locale } = useLocale();
  const day = getDayOfYear();
  const reading = getDayReading(day, locale);
  const progressPct = Math.round((day / 365) * 100);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-ink-950 text-ink-50 shadow-card ring-1 ring-white/10"
      >
        <div className="pointer-events-none absolute inset-4 rounded-lg ring-1 ring-inset ring-gold-300/20" />
        <div className="relative px-7 py-7 sm:px-10 sm:py-9">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <BookOpen size={15} className="text-gold-300" />
              <span className="kicker text-gold-300">
                {t.bibleReading.eyebrow}
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
              {t.bibleReading.dayOf(reading.day, 365)}
            </span>
          </div>

          <div className="mt-6 h-px w-full bg-gold-leaf opacity-60" />

          {/* Passages */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="kicker text-gold-300/80">
                {t.bibleReading.ot}
              </p>
              <p className="serif-display mt-2 text-2xl font-medium leading-snug text-ink-50 sm:text-3xl">
                {reading.ot}
              </p>
            </div>
            <div>
              <p className="kicker text-gold-300/80">
                {t.bibleReading.nt}
              </p>
              <p className="serif-display mt-2 text-2xl font-medium leading-snug text-ink-50 sm:text-3xl">
                {reading.nt}
              </p>
            </div>
          </div>

          {/* Progress bar + CTA */}
          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-sacred-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="shrink-0 text-[11px] text-ink-400">
              {progressPct}% {t.bibleReading.progress}
            </span>
            <a
              href="https://alkitab.sabda.org"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[11px] text-sacred-300 transition-colors hover:text-sacred-200"
            >
              {t.bibleReading.readNow}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

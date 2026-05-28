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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 24, delay: 0.15 }}
        className="overflow-hidden rounded-2xl bg-ink-900 text-ink-50 shadow-card"
      >
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <BookOpen size={14} className="text-sacred-400" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sacred-300">
                {t.bibleReading.eyebrow}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-ink-400">
              {t.bibleReading.dayOf(reading.day, 365)}
            </span>
          </div>

          {/* Passages */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-400">
                {t.bibleReading.ot}
              </p>
              <p className="serif-display mt-1.5 text-xl leading-snug text-ink-50 sm:text-2xl">
                {reading.ot}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-400">
                {t.bibleReading.nt}
              </p>
              <p className="serif-display mt-1.5 text-xl leading-snug text-ink-50 sm:text-2xl">
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

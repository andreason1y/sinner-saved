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
    <section className="mx-auto max-w-7xl px-5 pb-4 pt-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 24, delay: 0.15 }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-950 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.4)]"
      >
        {/* Gold accent top strip */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-sacred-500/60 to-transparent" />

        <div className="px-7 py-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={13} className="text-sacred-400" />
              <span className="text-[9px] uppercase tracking-[0.36em] text-sacred-400">
                {t.bibleReading.eyebrow}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.28em] text-ink-500">
              {t.bibleReading.dayOf(reading.day, 365)}
            </span>
          </div>

          {/* Readings */}
          <div className="mt-5 grid grid-cols-2 gap-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-ink-500">
                {t.bibleReading.ot}
              </p>
              <p className="serif-display mt-2 text-lg leading-snug text-ink-50 sm:text-xl">
                {reading.ot}
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute -left-2.5 top-0 h-full w-px bg-white/[0.07]" />
              <p className="text-[9px] uppercase tracking-[0.32em] text-ink-500">
                {t.bibleReading.nt}
              </p>
              <p className="serif-display mt-2 text-lg leading-snug text-ink-50 sm:text-xl">
                {reading.nt}
              </p>
            </div>
          </div>

          {/* Progress + CTA */}
          <div className="mt-6 flex items-center gap-3">
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sacred-600 to-sacred-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              />
            </div>
            <span className="shrink-0 text-[10px] tabular-nums text-ink-500">
              {progressPct}% {t.bibleReading.progress}
            </span>
            <a
              href="https://alkitab.sabda.org"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[10px] font-medium text-sacred-400 transition-colors hover:text-sacred-300"
            >
              {t.bibleReading.readNow}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

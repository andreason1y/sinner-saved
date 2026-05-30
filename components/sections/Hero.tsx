"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { t, locale } = useLocale();

  const dateLabel = new Date().toLocaleDateString(
    locale === "en" ? "en-US" : "id-ID",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Word-level entrance (highlight last word)
  const headlineId = ["Berpikir", "perlahan,", "membaca", "Alkitab", "dengan", "jujur."];
  const headlineEn = ["Thinking", "slowly,", "reading", "Scripture", "with", "honesty."];
  const headline = locale === "en" ? headlineEn : headlineId;
  const lastWord = headline[headline.length - 1];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-sacred-100/40 via-transparent to-transparent dark:from-sacred-500/[0.06]" />
        <div className="grain-overlay absolute inset-0 opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="pill dark:text-ink-100">
            <span className="h-1.5 w-1.5 rounded-full bg-sacred-500" />
            {dateLabel}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.32em] text-ink-500 dark:text-ink-400 sm:inline">
            {t.hero.tagline}
          </span>
        </motion.div>

        <motion.h1
          style={{ y: titleY, opacity: fade }}
          className="serif-display mt-8 max-w-5xl text-5xl leading-[1.02] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-7xl lg:text-[8.5rem] lg:leading-[0.95]"
        >
          {headline.map((word, i) => (
            <motion.span
              key={`${locale}-${word}-${i}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 20,
                mass: 0.9,
                delay: 0.3 + i * 0.08,
              }}
              className="mr-3 inline-block overflow-hidden align-baseline pb-[0.15em] mb-[-0.15em]"
            >
              <span className="inline-block">
                {word === lastWord ? (
                  <span className="italic text-sacred-500 dark:text-sacred-300">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          style={{ y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 24, delay: 1.0 }}
          className="mt-10 grid gap-10 sm:grid-cols-12"
        >
          <p className="sm:col-span-7 sm:col-start-1 text-base leading-relaxed text-ink-700 dark:text-ink-200 sm:text-lg">
            {t.hero.intro.split("SinnerSaved").map((part, i, arr) => (
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
          <div className="sm:col-span-4 sm:col-start-9 flex flex-col items-start gap-4">
            <a
              href="#latest"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-parchment transition-transform hover:scale-[1.02] dark:bg-ink-50 dark:text-ink-950"
            >
              {t.hero.cta}
              <ArrowDown size={14} />
            </a>
            <a
              href="#ruang-alkitab"
              className="text-sm text-ink-700 link-underline dark:text-ink-200"
            >
              {t.hero.explore}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 overflow-hidden border-y border-ink-900/10 py-4 dark:border-white/10"
        >
          <div className="flex animate-marquee gap-12 whitespace-nowrap text-sm uppercase tracking-[0.32em] text-ink-500 dark:text-ink-400">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0 gap-12">
                {[
                  "Kristus mati untuk kita — Roma 5:8",
                  "Diselamatkan oleh kasih karunia — Efesus 2:8",
                  "Menyelamatkan orang berdosa — 1 Timotius 1:15",
                  "Bagiku, hidup adalah Kristus — Filipi 1:21",
                  "Kita hidup untuk Tuhan — Roma 14:8",
                  "Untuk kemuliaan Allah — 1 Korintus 10:31",
                ].map((s) => (
                  <span key={`${dup}-${s}`} className="flex items-center gap-12">
                    {s}
                    <span className="text-sacred-500">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

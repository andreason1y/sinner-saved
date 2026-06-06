"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";

// Line_Art motif — a minimalist open book with fine light rays rising from the
// gutter (no cross). Purely decorative: the parent is aria-hidden. All strokes
// inherit the gold token via `currentColor`, use no color literals, and keep a
// hairline weight (≤1.5) that does not scale with the SVG.
function OpenBookLineArt() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      focusable="false"
    >
      {/* Left page — top edge curving out from the gutter */}
      <path
        d="M60 76 C 44 66 26 64 9 70"
        vectorEffect="non-scaling-stroke"
      />
      {/* Left page — lower leaf edge, mirroring the curve */}
      <path
        d="M60 82 C 44 73 26 71 9 76"
        vectorEffect="non-scaling-stroke"
      />
      {/* Right page — top edge, mirror of the left */}
      <path
        d="M60 76 C 76 66 94 64 111 70"
        vectorEffect="non-scaling-stroke"
      />
      {/* Right page — lower leaf edge */}
      <path
        d="M60 82 C 76 73 94 71 111 76"
        vectorEffect="non-scaling-stroke"
      />
      {/* Central spine rising from the gutter */}
      <path d="M60 78 L60 56" vectorEffect="non-scaling-stroke" />
      {/* Light rays fanning up from the gutter */}
      <path d="M60 52 L60 30" vectorEffect="non-scaling-stroke" />
      <path d="M53 53 L46 35" vectorEffect="non-scaling-stroke" />
      <path d="M67 53 L74 35" vectorEffect="non-scaling-stroke" />
      <path d="M47 55 L38 42" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Hero() {
  const { t, locale } = useLocale();

  const dateLabel = new Date().toLocaleDateString(
    locale === "en" ? "en-US" : "id-ID",
    { day: "numeric", month: "long", year: "numeric" }
  );

  // A complete sentence with one elegant italic phrase — set large in a
  // high-contrast Garamond, the way a printed frontispiece would carry it.
  const headPre = locale === "en" ? "Thinking slowly, reading Scripture with " : "Berpikir perlahan, membaca Alkitab dengan ";
  const headEm = locale === "en" ? "honesty." : "kejujuran.";

  const verse =
    locale === "en"
      ? "While we were still sinners, Christ died for us."
      : "Ketika kita masih berdosa, Kristus telah mati untuk kita.";
  const verseRef = locale === "en" ? "Romans 5 : 8" : "Roma 5 : 8";

  const reveal = {
    hidden: { opacity: 0, y: 14 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 0.84, 0.3, 1], delay: 0.1 + i * 0.12 },
    }),
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative layer — purely presentational, behind Primary_Content (contents added in later tasks) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Ornament_Layer: large fleuron watermark (reuses the existing gold-token .fleuron glyph) */}
        <span className="hero-fleuron-watermark fleuron" aria-hidden>
          &#10070;
        </span>
        {/* Ornament_Layer: soft paper-grain wash (reuses the existing bg-grain texture) */}
        <span className="hero-grain-wash absolute inset-0 bg-grain" aria-hidden />
        {/* Line_Art: open book + light rays, upper-right head region. Reuses the
            hero's existing `reveal` variant (no new easing/duration). */}
        <motion.div
          custom={0}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="hero-lineart hidden text-gold-500 dark:text-gold-300 md:block"
        >
          <OpenBookLineArt />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 lg:px-8 sm:pt-20">
        {/* Masthead rule + kicker */}
        <motion.div
          custom={0}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between gap-4"
        >
          <span className="kicker">Sinner &middot; Saved</span>
          <span className="hidden h-px flex-1 bg-gold-leaf sm:block" />
          <span className="kicker text-right">{dateLabel}</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="serif-display mt-10 max-w-5xl text-balance text-5xl font-medium leading-[1.04] text-ink-900 dark:text-ink-50 sm:text-7xl lg:text-[5.5rem] lg:leading-[0.98]"
        >
          {headPre}
          <span className="italic text-ink-800 dark:text-ink-100">{headEm}</span>
        </motion.h1>

        <motion.div
          custom={2}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="mt-12 grid gap-10 sm:grid-cols-12 sm:gap-12"
        >
          <p className="drop-cap text-[1.05rem] leading-[1.85] text-ink-700 dark:text-ink-200 sm:col-span-7 sm:text-lg">
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

          <div className="sm:col-span-4 sm:col-start-9">
            <div className="h-px w-full bg-gold-leaf" />
            <div className="mt-6 flex flex-col items-start gap-4">
              <a
                href="#latest"
                className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-ink-900 dark:text-ink-50"
              >
                <span className="link-underline">{t.hero.cta}</span>
                <span className="text-gold-500 transition-transform group-hover:translate-x-1 dark:text-gold-300">
                  &rarr;
                </span>
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

      {/* Frontispiece verse — centred between gold rules, like a colophon */}
      <motion.div
        custom={3}
        variants={reveal}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto mt-20 max-w-3xl px-5 pb-16 text-center sm:mt-24 sm:pb-20"
      >
        <div className="mx-auto mb-7 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gold-leaf" />
          <span className="fleuron text-gold-500 dark:text-gold-300">&#10070;</span>
          <span className="h-px w-16 bg-gold-leaf" />
        </div>
        <p className="serif-display text-2xl italic leading-snug text-ink-800 dark:text-ink-100 sm:text-3xl">
          &ldquo;{verse}&rdquo;
        </p>
        <p className="kicker mt-5 text-gold-600 dark:text-gold-300">{verseRef}</p>
      </motion.div>
    </section>
  );
}

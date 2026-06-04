"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDailyVerse } from "@/lib/scripture/verses";
import { buildReaderUrl } from "@/lib/scripture/parse";
import { localizeReference } from "@/lib/scripture/books";
import { useLocale } from "@/components/i18n/LocaleProvider";

type DailyVerse = { ref: string; text: string };

/**
 * "Ayat Hari Ini" — a single, elegantly-set verse that rotates daily.
 *
 * The verse is resolved on the client (in useEffect) so the day is computed
 * in the visitor's own timezone — the homepage itself is statically cached,
 * so computing at render time would freeze the verse at build/revalidate
 * time. A stable placeholder is shown until mount to avoid hydration drift.
 *
 * Locale-aware: "id" uses the curated local text instantly; "en" fetches the
 * English translation from /api/scripture (falling back to the local text if
 * the API is unavailable, so the card is never empty).
 */
export function VerseOfDay() {
  const { t, locale } = useLocale();
  const [verse, setVerse] = useState<DailyVerse | null>(null);

  useEffect(() => {
    const daily = getDailyVerse();

    if (locale !== "en") {
      setVerse({ ref: daily.ref, text: daily.text });
      return;
    }

    // English: fetch authoritative text; show placeholder until it lands.
    let cancelled = false;
    setVerse(null);
    fetch(`/api/scripture?ref=${encodeURIComponent(daily.ref)}&lang=en`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        const text =
          typeof d?.text === "string" && d.text.trim() ? d.text : daily.text;
        setVerse({ ref: daily.ref, text });
      })
      .catch(() => {
        if (!cancelled) setVerse({ ref: daily.ref, text: daily.text });
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-gold-200/70 bg-gradient-to-br from-sacred-50/60 via-parchment to-parchment p-8 shadow-card dark:border-gold-300/15 dark:from-sacred-500/[0.07] dark:via-ink-900 dark:to-ink-900 sm:p-14"
        >
          {/* Decorative oversized quotation mark */}
          <span
            aria-hidden
            className="serif-display pointer-events-none absolute -right-2 -top-10 select-none text-[12rem] leading-none text-gold-400/15 dark:text-gold-300/10"
          >
            &rdquo;
          </span>

          <div className="flex items-center gap-3">
            <span className="kicker shrink-0 text-gold-600 dark:text-gold-300">
              {t.verseOfDay.eyebrow}
            </span>
            <span className="h-px flex-1 bg-gold-leaf opacity-60" />
          </div>

          {verse ? (
            <>
              <blockquote className="serif-display mt-7 text-balance text-2xl font-medium leading-[1.45] text-ink-900 dark:text-ink-50 sm:text-3xl sm:leading-[1.4]">
                {verse.text}
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <cite className="not-italic text-sm font-medium uppercase tracking-[0.24em] text-sacred-700 dark:text-sacred-300">
                  {localizeReference(verse.ref, locale)}
                </cite>
                <a
                  href={buildReaderUrl(verse.ref)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                >
                  {t.verseOfDay.open}
                </a>
              </figcaption>
            </>
          ) : (
            // Placeholder until the client resolves today's verse.
            <div className="mt-7 space-y-3" aria-hidden>
              <div className="skeleton h-7 w-full" />
              <div className="skeleton h-7 w-11/12" />
              <div className="skeleton h-7 w-2/3" />
              <div className="skeleton mt-7 h-3 w-32" />
            </div>
          )}
        </motion.figure>
      </div>
    </section>
  );
}

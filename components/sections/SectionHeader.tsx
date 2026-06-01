"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  blurb?: string;
  href?: string;
  hrefLabel?: string;
  /** Optional roman-numeral / index shown as an oversized gold mark. */
  index?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  blurb,
  href,
  hrefLabel = "Lihat semua",
  index,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 0.84, 0.3, 1] }}
    >
      {/* Kicker row with a gold-leaf hairline */}
      <div className="flex items-center gap-4">
        <span className="kicker shrink-0">{eyebrow}</span>
        <span className="h-px flex-1 bg-gold-leaf" />
        {index && (
          <span className="serif-display shrink-0 text-sm italic text-gold-600 dark:text-gold-300">
            {index}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <h2 className="serif-display text-4xl font-medium leading-[1.05] text-ink-900 dark:text-ink-50 sm:text-5xl">
            {title}
          </h2>
          {blurb && (
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink-600 dark:text-ink-300">
              {blurb}
            </p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-700 dark:text-ink-200"
          >
            <span className="link-underline">{hrefLabel}</span>
            <span className="text-gold-500 transition-transform group-hover:translate-x-1 dark:text-gold-300">
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

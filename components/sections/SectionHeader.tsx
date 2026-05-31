"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  blurb?: string;
  href?: string;
  hrefLabel?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  blurb,
  href,
  hrefLabel = "Lihat semua",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="flex flex-col items-start justify-between gap-5 border-b border-ink-900/10 pb-6 dark:border-white/10 sm:flex-row sm:items-end"
    >
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
          {eyebrow}
        </p>
        <h2 className="serif-display mt-3 text-3xl leading-[1.08] text-ink-900 dark:text-ink-50 sm:text-4xl">
          {title}
        </h2>
        {blurb && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {blurb}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm text-ink-700 dark:text-ink-200"
        >
          <span className="link-underline">{hrefLabel}</span>
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </motion.div>
  );
}

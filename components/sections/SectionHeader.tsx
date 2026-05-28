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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 160, damping: 24, mass: 0.9 }}
      className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
    >
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.32em] text-sacred-600 dark:text-sacred-300">
          {eyebrow}
        </p>
        <h2 className="serif-display mt-3 text-4xl leading-[1.05] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-5xl">
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
          className="group inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/60 px-4 py-2 text-sm text-ink-800 backdrop-blur transition-colors hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:bg-white/[0.08]"
        >
          {hrefLabel}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </motion.div>
  );
}

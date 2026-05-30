"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { formatDate, localizePost } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

type NoteCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  createdAt: string;
  subCategory: string;
  mainCategory: "sinners-note";
};

export function SinnersNote({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();
  const items: NoteCard[] = posts.slice(0, 4).map((raw) => {
    const p = localizePost(raw, locale);
    return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    createdAt: p.createdAt,
    subCategory: p.subCategory,
    mainCategory: "sinners-note" as const,
  }; });

  return (
    <section id="sinners-note" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 items-center justify-center lg:flex">
        <p className="serif-display rotate-90 text-sm uppercase tracking-[0.5em] text-ink-300 dark:text-ink-700">
          {t.sinnersNote.sideText}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.sinnersNote.eyebrow}
          title={t.sinnersNote.title}
          blurb={t.sinnersNote.blurb}
          href="/kategori/sinners-note"
          hrefLabel={t.feature.archive.replace(" →", "")}
        />

        <div className="mt-14 masonry">
          {items.map((post, i) => {
            const variant = i % 4;
            const baseCard =
              "block rounded-2xl p-6 transition-all hover:-translate-y-1";
            const variants = [
              "bg-white shadow-card ring-1 ring-ink-900/5 hover:shadow-card-hover dark:bg-ink-900 dark:ring-white/5",
              "bg-ink-900 text-ink-50 shadow-card hover:shadow-card-hover dark:bg-ink-800",
              "bg-parchment-deep ring-1 ring-ink-900/10 hover:ring-ink-900/20 dark:bg-white/[0.04] dark:ring-white/10",
              "bg-gradient-to-br from-sacred-50 to-parchment-deep ring-1 ring-sacred-200/60 dark:from-sacred-500/10 dark:to-white/[0.03] dark:ring-sacred-500/20",
            ];
            const isDark = variant === 1;

            return (
              <Reveal key={post.id} delay={i * 0.06}>
                <Link
                  href={`/${post.mainCategory}/${post.slug}`}
                  className={`${baseCard} ${variants[variant]}`}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em]">
                      <span className={isDark ? "text-sacred-300" : "text-sacred-600 dark:text-sacred-300"}>
                        {post.subCategory.replace(/-/g, " ")}
                      </span>
                      <Quote size={14} className="text-ink-400 dark:text-ink-500" />
                    </div>
                    <h3
                      className={`serif-display mt-4 text-xl leading-snug ${
                        isDark ? "text-ink-50" : "text-ink-900 dark:text-ink-50"
                      } ${variant === 0 ? "sm:text-2xl" : ""}`}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isDark ? "text-ink-300" : "text-ink-600 dark:text-ink-300"
                      }`}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className={`mt-5 flex items-center justify-between text-xs ${
                        isDark ? "text-ink-400" : "text-ink-500 dark:text-ink-400"
                      }`}
                    >
                      <span>{formatDate(post.createdAt, locale)}</span>
                      <span className="link-underline">{t.sinnersNote.readNote}</span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

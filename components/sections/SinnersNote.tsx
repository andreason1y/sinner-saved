"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import type { Locale } from "@/lib/i18n/dictionary";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

function subName(mainSlug: string, subSlug: string, locale: Locale) {
  const cat = CATEGORIES.find((c) => c.slug === mainSlug);
  const sub = cat?.subcategories.find((s) => s.slug === subSlug);
  if (!sub) return subSlug.replace(/-/g, " ");
  return locale === "en" ? (sub.nameEn ?? sub.name) : sub.name;
}

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
  const items: NoteCard[] = posts.slice(0, 4).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    createdAt: p.createdAt,
    subCategory: p.subCategory,
    mainCategory: "sinners-note" as const,
  }));

  return (
    <section id="sinners-note" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.sinnersNote.eyebrow}
          title={t.sinnersNote.title}
          blurb={t.sinnersNote.blurb}
          href="/kategori/sinners-note"
          hrefLabel={t.feature.archive.replace(" →", "")}
          index="IV"
        />

        <div className="mt-14 masonry">
          {items.map((post, i) => {
            // Two quiet tones only — a dark note set among paper ones, like a
            // hand-bound notebook. No gold gradients, no per-card flourishes.
            const isDark = i % 3 === 1;
            const card = isDark
              ? "bg-ink-950 text-ink-50 ring-1 ring-white/10 hover:ring-gold-300/45 dark:bg-ink-900"
              : "bg-parchment-light ring-1 ring-ink-900/10 hover:ring-gold-400/60 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-gold-300/40";

            return (
              <Reveal key={post.id} delay={i * 0.05}>
                <Link
                  href={`/${post.mainCategory}/${post.slug}`}
                  className={`block rounded-2xl p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover ${card}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`kicker ${isDark ? "text-gold-300" : "text-gold-600 dark:text-gold-300"}`}>
                      {subName(post.mainCategory, post.subCategory, locale)}
                    </span>
                    <Quote size={15} className={isDark ? "text-gold-300/70" : "text-gold-500/70 dark:text-gold-300/70"} />
                  </div>
                  <h3
                    className={`serif-display mt-4 text-xl font-medium leading-snug ${
                      isDark ? "text-ink-50" : "text-ink-900 dark:text-ink-50"
                    }`}
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
                    className={`mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] ${
                      isDark ? "text-ink-400" : "text-ink-500 dark:text-ink-400"
                    }`}
                  >
                    <span>{formatDate(post.createdAt, locale)}</span>
                    <span className="link-underline">{t.sinnersNote.readNote}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

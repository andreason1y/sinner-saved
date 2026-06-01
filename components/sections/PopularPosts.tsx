"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

function subName(mainSlug: string, subSlug: string) {
  const cat = CATEGORIES.find((c) => c.slug === mainSlug);
  return cat?.subcategories.find((s) => s.slug === subSlug)?.name ?? subSlug;
}

export function PopularPosts({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();

  if (posts.length === 0) return null;

  return (
    <section id="populer" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.popular.eyebrow}
          title={t.popular.title}
          blurb={t.popular.blurb}
          href="/arsip"
          hrefLabel={t.feature.archive.replace(" →", "")}
        />

        <StaggerContainer className="mt-14 flex flex-col">
          {posts.map((post, i) => (
            <FadeInUp key={post.id}>
              <Link
                href={`/${post.mainCategory}/${post.slug}`}
                className="group flex items-center gap-5 border-t border-ink-900/10 py-7 last:border-b dark:border-white/10 sm:gap-8"
              >
                {/* Rank */}
                <span
                  aria-label={`${t.popular.rankLabel} ${i + 1}`}
                  className="serif-display w-10 shrink-0 text-4xl italic tabular-nums text-ink-300 transition-colors duration-300 group-hover:text-gold-500 dark:text-ink-700 dark:group-hover:text-gold-300 sm:w-16 sm:text-6xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Body */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="kicker text-gold-600 dark:text-gold-300">{subName(post.mainCategory, post.subCategory)}</span>
                    <span className="h-px w-6 bg-gold-leaf" />
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink-400 dark:text-ink-500">{formatDate(post.createdAt, locale)}</span>
                  </div>
                  <h3 className="serif-display mt-2 line-clamp-2 text-xl font-medium leading-snug text-ink-900 transition-colors duration-300 group-hover:text-gold-700 dark:text-ink-50 dark:group-hover:text-gold-200 sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-1 text-sm text-ink-500 dark:text-ink-400">
                    {post.excerpt}
                  </p>
                </div>

                {/* Thumbnail */}
                {post.cover && (
                  <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-ink-900/10 dark:ring-white/10 sm:block">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                )}
              </Link>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
              <motion.div whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 26 }}>
                <Link
                  href={`/${post.mainCategory}/${post.slug}`}
                  className="group flex items-center gap-5 border-t border-ink-900/10 py-6 last:border-b dark:border-white/10 sm:gap-8"
                >
                  {/* Rank */}
                  <span
                    aria-label={`${t.popular.rankLabel} ${i + 1}`}
                    className="serif-display w-10 shrink-0 text-3xl tabular-nums text-ink-300 transition-colors group-hover:text-sacred-500 dark:text-ink-600 dark:group-hover:text-sacred-300 sm:w-14 sm:text-5xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-sacred-600 dark:text-sacred-300">
                      <span>{subName(post.mainCategory, post.subCategory)}</span>
                      <span className="text-ink-300 dark:text-ink-600">·</span>
                      <span className="text-ink-400 dark:text-ink-500">
                        {formatDate(post.createdAt, locale)}
                      </span>
                    </div>
                    <h3 className="serif-display mt-1.5 line-clamp-2 text-xl leading-snug text-ink-900 transition-colors group-hover:text-sacred-700 dark:text-ink-50 dark:group-hover:text-sacred-200 sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-1 text-sm text-ink-500 dark:text-ink-400">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Thumbnail */}
                  {post.cover && (
                    <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:block">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

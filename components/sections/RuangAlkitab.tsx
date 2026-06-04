"use client";

import Image from "next/image";
import Link from "next/link";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import type { Post } from "@/lib/types";
import { formatDate, postExcerpt, postTitle } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function RuangAlkitab({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();

  return (
    <section id="ruang-alkitab" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.ruangAlkitab.eyebrow}
          title={t.ruangAlkitab.title}
          blurb={t.ruangAlkitab.blurb}
          href="/kategori/ruang-alkitab"
          hrefLabel={t.feature.archive.replace(" →", "")}
          index="I"
        />

        {posts.length > 0 && (
          <div className="mt-16">
            <div className="mb-7 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-ink-500 dark:text-ink-400">
              <span>{t.ruangAlkitab.latest}</span>
              <Link
                href="/kategori/ruang-alkitab"
                className="text-ink-600 link-underline dark:text-ink-300"
              >
                {t.ruangAlkitab.seeMore}
              </Link>
            </div>
            <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <FadeInUp key={post.id}>
                  <Link
                    href={`/${post.mainCategory}/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl bg-parchment-light shadow-card ring-1 ring-ink-900/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold-400/60 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-gold-300/40"
                  >
                    {post.cover && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-ink-950/5" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="kicker text-gold-600 dark:text-gold-300">
                        {post.subCategory.replace(/-/g, " ")}
                      </p>
                      <h3 className="serif-display mt-3 text-xl leading-snug text-ink-900 dark:text-ink-50">
                        {postTitle(post, locale)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
                        {postExcerpt(post, locale)}
                      </p>
                      <p className="mt-4 text-xs text-ink-500 dark:text-ink-400">
                        {formatDate(post.createdAt, locale)}
                      </p>
                    </div>
                  </Link>
                </FadeInUp>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </section>
  );
}

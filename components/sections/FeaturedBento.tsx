"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { Post } from "@/lib/types";
import { formatDate, postExcerpt, postTitle } from "@/lib/utils";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { useLocale } from "@/components/i18n/LocaleProvider";

function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? "—";
}

export function FeaturedBento({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();
  if (posts.length === 0) return null;
  const [hero, ...rest] = posts;

  return (
    <section id="latest" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <span className="kicker shrink-0">{t.feature.eyebrow}</span>
            <span className="h-px flex-1 bg-gold-leaf" />
          </div>
          <div className="mt-6 flex items-end justify-between gap-6">
            <h2 className="serif-display text-4xl font-medium leading-[1.05] text-ink-900 dark:text-ink-50 sm:text-5xl">
              {t.feature.title}
            </h2>
            <Link
              href="/arsip"
              className="group hidden shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-700 dark:text-ink-200 sm:inline-flex"
            >
              <span className="link-underline">{t.feature.archive}</span>
              <span className="text-gold-500 transition-transform group-hover:translate-x-1 dark:text-gold-300">&rarr;</span>
            </Link>
          </div>
        </div>

        <StaggerContainer className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-5 sm:grid-cols-6 lg:grid-cols-12">
          {hero && (
            <FadeInUp className="sm:col-span-6 lg:col-span-7 lg:row-span-2">
              <Link
                href={`/${hero.mainCategory}/${hero.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-ink-900 shadow-card ring-1 ring-ink-900/10 transition-all duration-500 hover:shadow-card-hover hover:ring-gold-300/40 dark:ring-white/10"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden lg:aspect-auto lg:h-full">
                  {hero.cover && (
                    <Image
                      src={hero.cover}
                      alt={hero.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      priority
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/35 to-ink-950/5" />
                </div>

                <div className="pointer-events-none absolute inset-5 ring-1 ring-inset ring-gold-200/20 sm:inset-8" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                  <div className="flex items-center gap-3">
                    <span className="kicker text-gold-300">{categoryName(hero.mainCategory)}</span>
                    <span className="h-px w-8 bg-gold-leaf" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-ink-300">{formatDate(hero.createdAt, locale)}</span>
                  </div>
                  <h3 className="serif-display clamp-descenders mt-4 max-w-3xl text-3xl font-medium leading-tight text-ink-50 line-clamp-3 sm:text-5xl">
                    {postTitle(hero, locale)}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-200 line-clamp-2 sm:text-base">
                    {postExcerpt(hero, locale)}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-100">
                    <span className="link-underline">{t.feature.readMore}</span>
                    <span className="text-gold-300 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          )}

          {rest.slice(0, 4).map((post, i) => (
            <FadeInUp
              key={post.id}
              className={`sm:col-span-3 ${
                i < 2 ? "lg:col-span-5" : "lg:col-span-6"
              }`}
            >
              <Link
                href={`/${post.mainCategory}/${post.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-parchment-light shadow-card ring-1 ring-ink-900/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold-400/60 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-gold-300/40"
              >
                <div className="grid h-full grid-cols-5">
                  {post.cover && (
                    <div className="relative col-span-2 aspect-[4/5] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 20vw, 40vw"
                        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col justify-between p-6 ${
                      post.cover ? "col-span-3" : "col-span-5"
                    }`}
                  >
                    <div>
                      <p className="kicker text-gold-600 dark:text-gold-300">
                        {categoryName(post.mainCategory)}
                      </p>
                      <h3 className="serif-display clamp-descenders mt-3 text-xl font-medium leading-snug text-ink-900 line-clamp-2 dark:text-ink-50 sm:text-2xl">
                        {postTitle(post, locale)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                        {postExcerpt(post, locale)}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
                      <span>{formatDate(post.createdAt, locale)}</span>
                      {post.readingMinutes && (
                        <span>{t.feature.readingTime(post.readingMinutes)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

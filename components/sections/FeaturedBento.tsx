"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
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
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-ink-900/10 pb-6 dark:border-white/10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
              {t.feature.eyebrow}
            </p>
            <h2 className="serif-display mt-3 text-3xl leading-[1.08] text-ink-900 dark:text-ink-50 sm:text-4xl">
              {t.feature.title}
            </h2>
          </div>
          <Link
            href="/arsip"
            className="hidden text-sm text-ink-700 link-underline dark:text-ink-200 sm:inline"
          >
            {t.feature.archive}
          </Link>
        </div>

        <StaggerContainer className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-5 sm:grid-cols-6 lg:grid-cols-12">
          {hero && (
            <FadeInUp className="sm:col-span-6 lg:col-span-7 lg:row-span-2">
              <Link
                href={`/${hero.mainCategory}/${hero.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-ink-900/10 dark:ring-white/10"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden lg:aspect-auto lg:h-full">
                  {hero.cover && (
                    <Image
                      src={hero.cover}
                      alt={hero.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-ink-200/80">
                    <span>{categoryName(hero.mainCategory)}</span>
                    <span className="opacity-50">·</span>
                    <span>{formatDate(hero.createdAt, locale)}</span>
                  </div>
                  <h3 className="serif-display mt-4 max-w-3xl text-3xl leading-tight text-ink-50 line-clamp-3 sm:text-4xl">
                    {hero.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm text-ink-200 line-clamp-2 sm:text-base">
                    {hero.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-ink-100">
                    <span className="link-underline">{t.feature.readMore}</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          )}

          {rest.slice(0, 4).map((post) => (
            <FadeInUp key={post.id} className="sm:col-span-3 lg:col-span-5">
              <Link
                href={`/${post.mainCategory}/${post.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/10 transition-colors hover:ring-ink-900/25 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-white/25"
              >
                <div className="grid h-full grid-cols-5">
                  {post.cover && (
                    <div className="relative col-span-2 aspect-[4/5] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 20vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col justify-between p-5 ${
                      post.cover ? "col-span-3" : "col-span-5"
                    }`}
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-ink-400 dark:text-ink-500">
                        {categoryName(post.mainCategory)}
                      </p>
                      <h3 className="serif-display mt-3 text-xl leading-snug text-ink-900 line-clamp-2 dark:text-ink-50">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
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

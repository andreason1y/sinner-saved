"use client";

import Image from "next/image";
import Link from "next/link";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import type { Post } from "@/lib/types";
import { formatDate, localizePost } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function RuangAlkitab({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();
  const localizedPosts = posts.map((p) => localizePost(p, locale));

  return (
    <section
      id="ruang-alkitab"
      className="relative py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(245,215,156,0.18) 50%, transparent 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.ruangAlkitab.eyebrow}
          title={t.ruangAlkitab.title}
          blurb={t.ruangAlkitab.blurb}
          href="/kategori/ruang-alkitab"
          hrefLabel={t.feature.archive.replace(" →", "")}
        />

        {posts.length > 0 && (
          <div className="mt-20">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-ink-500 dark:text-ink-400">
              <span>{t.ruangAlkitab.latest}</span>
              <Link
                href="/kategori/ruang-alkitab"
                className="text-ink-700 link-underline dark:text-ink-200"
              >
                {t.ruangAlkitab.seeMore}
              </Link>
            </div>
            <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {localizedPosts.map((post) => (
                <FadeInUp key={post.id}>
                  <Link
                    href={`/${post.mainCategory}/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-ink-900 dark:ring-white/10"
                  >
                    {post.cover && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-600 dark:text-sacred-300">
                        {post.subCategory.replace(/-/g, " ")}
                      </p>
                      <h3 className="serif-display mt-3 text-xl leading-snug text-ink-900 dark:text-ink-50">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
                        {post.excerpt}
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

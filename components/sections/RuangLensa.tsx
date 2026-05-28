"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function RuangLensa({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();

  return (
    <section
      id="ruang-lensa"
      className="relative bg-parchment-deep/40 py-24 dark:bg-white/[0.02] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.ruangLensa.eyebrow}
          title={t.ruangLensa.title}
          blurb={t.ruangLensa.blurb}
          href="/kategori/ruang-lensa"
          hrefLabel={t.feature.archive.replace(" →", "")}
        />

        {posts.length === 0 ? (
          <p className="mt-14 text-sm text-ink-500 dark:text-ink-400">
            {t.archive.emptyBody}
          </p>
        ) : (
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <FadeInUp key={post.id} className="group">
              <Link
                href={`/${post.mainCategory}/${post.slug}`}
                className="relative block h-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-ink-900 dark:ring-white/10"
              >
                {post.cover && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-300">
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {post.subCategory.replace(/-/g, " ")}
                      </p>
                      <h3 className="serif-display mt-2 text-xl leading-snug text-ink-50">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <p className="line-clamp-3 text-sm text-ink-600 dark:text-ink-300">
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
        )}
      </div>
    </section>
  );
}

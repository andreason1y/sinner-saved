"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { formatDate, postExcerpt, postTitle } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function RuangTeologi({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();

  return (
    <section id="ruang-teologi" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.ruangTeologi.eyebrow}
          title={t.ruangTeologi.title}
          blurb={t.ruangTeologi.blurb}
          href="/kategori/ruang-teologi"
          hrefLabel={t.feature.archive.replace(" →", "")}
          index="II"
        />

        {posts.length === 0 ? (
          <p className="mt-14 text-sm text-ink-500 dark:text-ink-400">
            {t.archive.emptyBody}
          </p>
        ) : (
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <FadeInUp key={post.id}>
              <Link
                href={`/${post.mainCategory}/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink-950 text-ink-50 shadow-card ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold-300/45"
              >
                {post.cover && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-75 transition-all duration-[1100ms] ease-out group-hover:scale-[1.05] group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
                  </div>
                )}
                <div className="relative flex flex-1 flex-col p-7 sm:p-8">
                  <p className="kicker text-gold-300">
                    {post.subCategory.replace(/-/g, " ")}
                  </p>
                  <h3 className="serif-display mt-4 line-clamp-2 text-2xl font-medium leading-snug text-ink-50 sm:text-3xl">
                    {postTitle(post, locale)}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-300">
                    {postExcerpt(post, locale)}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-7 text-[11px] uppercase tracking-[0.18em] text-ink-400">
                    <span>{formatDate(post.createdAt, locale)}</span>
                    <span className="inline-flex items-center gap-2">
                      <span className="link-underline">{t.feature.readMore}</span>
                      <span className="text-gold-300">&rarr;</span>
                    </span>
                  </div>
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

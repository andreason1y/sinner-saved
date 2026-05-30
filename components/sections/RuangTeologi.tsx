"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { formatDate, localizePost } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function RuangTeologi({ posts }: { posts: Post[] }) {
  const { t, locale } = useLocale();
  const localizedPosts = posts.map((p) => localizePost(p, locale));

  return (
    <section id="ruang-teologi" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow={t.ruangTeologi.eyebrow}
          title={t.ruangTeologi.title}
          blurb={t.ruangTeologi.blurb}
          href="/kategori/ruang-teologi"
          hrefLabel={t.feature.archive.replace(" →", "")}
        />

        {localizedPosts.length === 0 ? (
          <p className="mt-14 text-sm text-ink-500 dark:text-ink-400">
            {t.archive.emptyBody}
          </p>
        ) : (
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {localizedPosts.map((post, i) => (
            <FadeInUp key={post.id}>
              <motion.div
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
              >
                <Link
                  href={`/${post.mainCategory}/${post.slug}`}
                  className="group relative block h-full overflow-hidden rounded-3xl bg-ink-950 text-ink-50 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  {post.cover && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-80 transition-all duration-[1200ms] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                    </div>
                  )}
                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-sacred-300">
                      <span className="font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{post.subCategory.replace(/-/g, " ")}</span>
                    </div>
                    <h3 className="serif-display mt-4 text-2xl leading-snug text-ink-50 sm:text-3xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-ink-300">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-xs text-ink-300">
                      <span>{formatDate(post.createdAt, locale)}</span>
                      <span className="link-underline">{t.feature.readMore} →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </FadeInUp>
          ))}
        </StaggerContainer>
        )}
      </div>
    </section>
  );
}

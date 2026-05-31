"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

function subName(mainSlug: string, subSlug: string) {
  const cat = CATEGORIES.find((c) => c.slug === mainSlug);
  return cat?.subcategories.find((s) => s.slug === subSlug)?.name ?? subSlug;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Wraps every occurrence of any search term in <mark>. Used by the search
 * page so matched words pop within the title/excerpt. Returns the plain
 * string untouched when there are no terms.
 */
function highlight(text: string, terms?: string[]): React.ReactNode {
  if (!terms || terms.length === 0) return text;
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark
        key={i}
        className="rounded bg-sacred-200/70 px-0.5 text-inherit dark:bg-sacred-400/25"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

type Variant = "default" | "compact" | "feature" | "dark";

export function PostCard({
  post,
  variant = "default",
  layoutId,
  highlightTerms,
}: {
  post: Post;
  variant?: Variant;
  layoutId?: string;
  highlightTerms?: string[];
}) {
  const sub = subName(post.mainCategory, post.subCategory);
  const href = `/${post.mainCategory}/${post.slug}`;
  const { locale, t } = useLocale();

  if (variant === "compact") {
    return (
      <motion.article layout layoutId={layoutId} className="h-full">
        <Link
          href={href}
          className="group flex h-full gap-4 rounded-2xl bg-white/60 p-4 ring-1 ring-ink-900/10 transition-colors hover:bg-white hover:ring-ink-900/25 dark:bg-white/[0.03] dark:ring-white/10 dark:hover:ring-white/25"
        >
          {post.cover && (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink-400 dark:text-ink-500">
                {sub}
              </p>
              <h3 className="serif-display mt-1.5 line-clamp-2 text-base leading-snug text-ink-900 dark:text-ink-50">
                {post.title}
              </h3>
            </div>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              {formatDate(post.createdAt, locale)}
              {post.readingMinutes && ` · ${t.feature.readingTime(post.readingMinutes)}`}
            </p>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "dark") {
    return (
      <motion.article layout layoutId={layoutId} className="h-full">
        <Link
          href={href}
          className="group relative block h-full overflow-hidden rounded-2xl bg-ink-950 text-ink-50 ring-1 ring-white/10 transition-colors hover:ring-white/25"
        >
          {post.cover && (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
            </div>
          )}
          <div className="p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink-200/80">
              {sub}
            </p>
            <h3 className="serif-display mt-3 line-clamp-3 text-2xl leading-snug text-ink-50">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-ink-300">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center justify-between text-xs text-ink-300">
              <span>{formatDate(post.createdAt, locale)}</span>
              <span className="link-underline">{t.feature.readMore} →</span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "feature") {
    return (
      <motion.article layout layoutId={layoutId} className="h-full">
        <Link
          href={href}
          className="group relative block h-full overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10 transition-colors hover:ring-white/25"
        >
          {post.cover && (
            <div className="relative aspect-[16/11] w-full overflow-hidden lg:aspect-auto lg:h-full">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink-200/80">
              {sub} · {formatDate(post.createdAt, locale)}
            </p>
            <h3 className="serif-display mt-3 max-w-2xl line-clamp-3 text-3xl leading-tight text-ink-50 sm:text-4xl">
              {post.title}
            </h3>
            <p className="mt-3 max-w-xl line-clamp-2 text-sm text-ink-200">{post.excerpt}</p>
          </div>
        </Link>
      </motion.article>
    );
  }

  // default
  return (
    <motion.article layout layoutId={layoutId} className="h-full">
      <Link
        href={href}
        className="group block h-full overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/10 transition-colors hover:ring-ink-900/25 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-white/25"
      >
        {post.cover && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
            {sub}
          </p>
          <h3 className="serif-display mt-3 line-clamp-2 text-xl leading-snug text-ink-900 dark:text-ink-50">
            {highlight(post.title, highlightTerms)}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
            {highlight(post.excerpt, highlightTerms)}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
            <span>{formatDate(post.createdAt, locale)}</span>
            {post.readingMinutes && (
              <span>{t.feature.readingTime(post.readingMinutes)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

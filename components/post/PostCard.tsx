"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import { formatDate, postExcerpt, postTitle } from "@/lib/utils";
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

/**
 * "Stretched link" pattern: the whole card is clickable via an absolutely
 * positioned overlay <Link> (z-[1]), while inner links (the sub-category
 * label) sit above it at z-10 and stay independently clickable. This avoids
 * nesting <a> inside <a>, which is invalid HTML and breaks hydration.
 */
function SubCategoryLink({
  post,
  className,
}: {
  post: Post;
  className: string;
}) {
  return (
    <Link
      href={`/kategori/${post.mainCategory}/${post.subCategory}`}
      className={`relative z-10 self-start ${className}`}
    >
      {subName(post.mainCategory, post.subCategory)}
    </Link>
  );
}

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="absolute inset-0 z-[1]">
      <span className="sr-only">{label}</span>
    </Link>
  );
}

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
  const href = `/${post.mainCategory}/${post.slug}`;
  const { locale, t } = useLocale();
  const title = postTitle(post, locale);
  const excerpt = postExcerpt(post, locale);

  if (variant === "compact") {
    return (
      <motion.article
        layout
        layoutId={layoutId}
        className="group relative flex h-full gap-4 rounded-2xl bg-parchment-light p-4 shadow-card ring-1 ring-ink-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-gold-400/60 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-gold-300/40"
      >
        {post.cover && (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={post.cover}
              alt={title}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <SubCategoryLink
              post={post}
              className="text-[10px] uppercase tracking-[0.24em] text-gold-600 hover:text-gold-700 dark:text-gold-300 dark:hover:text-gold-200"
            />
            <h3 className="serif-display clamp-descenders mt-1.5 line-clamp-2 text-base leading-snug text-ink-900 dark:text-ink-50">
              {title}
            </h3>
          </div>
          <p className="text-xs text-ink-500 dark:text-ink-400">
            {formatDate(post.createdAt, locale)}
            {post.readingMinutes && ` · ${t.feature.readingTime(post.readingMinutes)}`}
          </p>
        </div>
        <CardLink href={href} label={title} />
      </motion.article>
    );
  }

  if (variant === "dark") {
    return (
      <motion.article
        layout
        layoutId={layoutId}
        className="group relative block h-full overflow-hidden rounded-2xl bg-ink-950 text-ink-50 shadow-card ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold-300/45"
      >
        {post.cover && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.cover}
              alt={title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <SubCategoryLink
            post={post}
            className="text-[10px] uppercase tracking-[0.28em] text-gold-200 hover:text-gold-100"
          />
          <h3 className="serif-display clamp-descenders mt-3 line-clamp-3 text-2xl leading-snug text-ink-50">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-ink-300">
            {excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between text-xs text-ink-300">
            <span>{formatDate(post.createdAt, locale)}</span>
            <span className="link-underline">{t.feature.readMore} →</span>
          </div>
        </div>
        <CardLink href={href} label={title} />
      </motion.article>
    );
  }

  if (variant === "feature") {
    return (
      <motion.article layout layoutId={layoutId} className="h-full">
        <Link
          href={href}
          className="group relative block h-full overflow-hidden rounded-2xl bg-ink-900 shadow-card ring-1 ring-white/10 transition-all duration-500 hover:shadow-card-hover hover:ring-gold-300/45"
        >
          {post.cover && (
            <div className="relative aspect-[16/11] w-full overflow-hidden lg:aspect-auto lg:h-full">
              <Image
                src={post.cover}
                alt={title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold-200">
              {subName(post.mainCategory, post.subCategory)} ·{" "}
              {formatDate(post.createdAt, locale)}
            </p>
            <h3 className="serif-display clamp-descenders mt-3 max-w-2xl line-clamp-3 text-3xl leading-tight text-ink-50 sm:text-4xl">
              {title}
            </h3>
            <p className="mt-3 max-w-xl line-clamp-2 text-sm text-ink-200">{excerpt}</p>
          </div>
        </Link>
      </motion.article>
    );
  }

  // default
  return (
    <motion.article
      layout
      layoutId={layoutId}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-parchment-light shadow-card ring-1 ring-ink-900/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold-400/60 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-gold-300/40"
    >
      {post.cover && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.cover}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <SubCategoryLink
          post={post}
          className="text-[10px] uppercase tracking-[0.28em] text-gold-600 hover:text-gold-700 dark:text-gold-300 dark:hover:text-gold-200"
        />
        <h3 className="serif-display mt-3 line-clamp-2 text-xl leading-snug text-ink-900 dark:text-ink-50">
          {highlight(title, highlightTerms)}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">
          {highlight(excerpt, highlightTerms)}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
          <span>{formatDate(post.createdAt, locale)}</span>
          {post.readingMinutes && (
            <span>{t.feature.readingTime(post.readingMinutes)}</span>
          )}
        </div>
      </div>
      <CardLink href={href} label={title} />
    </motion.article>
  );
}

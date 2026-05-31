"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Search, X } from "lucide-react";
import type { Post } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import { PostCard } from "./PostCard";
import { useLocale } from "@/components/i18n/LocaleProvider";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.9 },
  },
  exit: { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.2 } },
};

/**
 * Pre-computes a lowercased "haystack" string per post so each keystroke is a
 * cheap substring scan. We index both locales (title/excerpt + EN) plus the
 * tags and the human-readable category / sub-category names.
 */
function buildHaystack(post: Post): string {
  const cat = CATEGORIES.find((c) => c.slug === post.mainCategory);
  const sub = cat?.subcategories.find((s) => s.slug === post.subCategory);
  const parts = [
    post.title,
    post.titleEn,
    post.excerpt,
    post.excerptEn,
    ...(post.tags ?? []),
    cat?.name,
    cat?.nameEn,
    sub?.name,
    sub?.nameEn,
  ];
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export function SearchView({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the field on mount for a search-first experience.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the URL in sync (debounced) so results are shareable & bookmarkable.
  useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = query.trim();
      const next = trimmed ? `/cari?q=${encodeURIComponent(trimmed)}` : "/cari";
      router.replace(next, { scroll: false });
    }, 300);
    return () => clearTimeout(id);
  }, [query, router]);

  const index = useMemo(
    () => posts.map((post) => ({ post, haystack: buildHaystack(post) })),
    [posts]
  );

  const trimmed = query.trim().toLowerCase();
  const terms = trimmed.split(/\s+/).filter(Boolean);

  const results = useMemo(() => {
    if (terms.length === 0) return [];
    // Every term must appear (AND match) — keeps multi-word queries precise.
    return index
      .filter(({ haystack }) => terms.every((term) => haystack.includes(term)))
      .map(({ post }) => post);
  }, [index, terms]);

  const hasQuery = trimmed.length > 0;

  return (
    <section className="relative pb-32 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
            {t.search.label}
          </p>
          <h1 className="serif-display mt-4 text-4xl leading-[1.08] text-ink-900 dark:text-ink-50 sm:text-6xl">
            {t.search.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {t.search.intro}
          </p>
        </motion.div>

        {/* Search field */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 24, delay: 0.1 }}
          className="mt-10"
        >
          <div className="group relative flex items-center gap-3 rounded-2xl border border-ink-900/15 bg-white/70 px-5 py-4 shadow-card transition-colors focus-within:border-ink-900/40 dark:border-white/15 dark:bg-white/[0.04] dark:focus-within:border-white/40">
            <Search
              size={20}
              className="shrink-0 text-ink-400 transition-colors group-focus-within:text-ink-700 dark:group-focus-within:text-ink-200"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              aria-label={t.search.label}
              className="flex-1 bg-transparent text-lg text-ink-900 placeholder:text-ink-400 focus:outline-none dark:text-ink-50 dark:placeholder:text-ink-500 [&::-webkit-search-cancel-button]:hidden"
            />
            <AnimatePresence>
              {hasQuery && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label={t.search.clear}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-900/5 text-ink-500 transition-colors hover:bg-ink-900/10 hover:text-ink-900 dark:bg-white/5 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-ink-50"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {hasQuery && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-sm text-ink-500 dark:text-ink-400"
              >
                {t.search.resultsLabel(results.length)}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results / states */}
        {!hasQuery ? (
          <EmptyState title={t.search.promptTitle} body={t.search.promptBody} />
        ) : results.length === 0 ? (
          <EmptyState
            title={t.search.emptyTitle}
            body={t.search.emptyBody(query.trim())}
          />
        ) : (
          <motion.div
            key={trimmed}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {results.map((post) => (
                <motion.div key={post.id} variants={cardVariants} exit="exit" layout>
                  <PostCard post={post} highlightTerms={terms} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-16 rounded-3xl border border-dashed border-ink-900/15 bg-white/40 p-16 text-center dark:border-white/15 dark:bg-white/[0.02]"
    >
      <p className="serif-display text-3xl text-ink-900 dark:text-ink-50">{title}</p>
      <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">{body}</p>
    </motion.div>
  );
}

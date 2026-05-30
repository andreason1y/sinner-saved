"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Post } from "@/lib/types";
import { CATEGORIES, localizeCategory } from "@/lib/categories";
import { PostCard } from "./PostCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
};

export function FullArchive({ posts }: { posts: Post[] }) {
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const { t, locale } = useLocale();

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts) c[p.mainCategory] = (c[p.mainCategory] ?? 0) + 1;
    return c;
  }, [posts]);

  const filtered = useMemo(
    () => (activeMain === null ? posts : posts.filter((p) => p.mainCategory === activeMain)),
    [activeMain, posts]
  );

  const categories = CATEGORIES.map((c) => localizeCategory(c, locale));

  return (
    <section className="relative pb-32 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-radial-glow opacity-70 dark:opacity-30" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        >
          <p className="text-xs uppercase tracking-[0.32em] text-sacred-600 dark:text-sacred-300">
            {t.archive.arsipLabel(posts.length)}
          </p>
          <h1 className="serif-display mt-4 text-5xl leading-[1.02] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-7xl">
            {t.archive.arsipTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {t.archive.arsipIntro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 24, delay: 0.1 }}
          className="mt-12 border-y border-ink-900/10 py-5 dark:border-white/10"
        >
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill
              label={t.archive.all}
              count={posts.length}
              isActive={activeMain === null}
              onClick={() => setActiveMain(null)}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat.slug}
                label={cat.name}
                count={counts[cat.slug] ?? 0}
                isActive={activeMain === cat.slug}
                onClick={() => setActiveMain(cat.slug)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          key={activeMain ?? "all"}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div key={post.id} variants={cardVariants} exit="exit" layout>
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 rounded-3xl border border-dashed border-ink-900/15 bg-white/40 p-16 text-center dark:border-white/15 dark:bg-white/[0.02]"
          >
            <p className="serif-display text-3xl text-ink-900 dark:text-ink-50">
              {t.archive.emptyTitle}
            </p>
            <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
              {t.archive.emptyBody}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FilterPill({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors",
        isActive
          ? "border-ink-900 text-parchment dark:border-ink-50 dark:text-ink-950"
          : "border-ink-900/15 text-ink-700 hover:text-ink-900 dark:border-white/15 dark:text-ink-200 dark:hover:text-ink-50"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="arsip-filter-active-bg"
          className="absolute inset-0 -z-10 rounded-full bg-ink-900 dark:bg-ink-50"
          transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
        />
      )}
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
          isActive
            ? "bg-parchment/20 text-parchment dark:bg-ink-950/20 dark:text-ink-950"
            : "bg-ink-900/5 text-ink-500 dark:bg-white/5 dark:text-ink-400"
        )}
      >
        {count}
      </span>
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { MainCategory, Post } from "@/lib/types";
import { CategoryFilter } from "./CategoryFilter";
import { PostCard } from "./PostCard";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/i18n/LocaleProvider";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(4px)",
    transition: { duration: 0.25 },
  },
};

export function CategoryArchive({
  category,
  posts,
}: {
  category: MainCategory;
  posts: Post[];
}) {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const { t } = useLocale();

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts) c[p.subCategory] = (c[p.subCategory] ?? 0) + 1;
    return c;
  }, [posts]);

  const filtered = useMemo(
    () =>
      activeSub === null
        ? posts
        : posts.filter((p) => p.subCategory === activeSub),
    [activeSub, posts]
  );

  return (
    <section className="relative pb-32 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-radial-glow opacity-70 dark:opacity-30" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-sacred-600 dark:text-sacred-300">
            {t.archive.categoryLabel(posts.length)}
          </p>
          <h1 className="serif-display mt-4 text-5xl leading-[1.02] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-7xl">
            {category.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {category.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 border-y border-ink-900/10 py-5 dark:border-white/10">
            <CategoryFilter
              subs={category.subcategories}
              active={activeSub}
              onSelect={setActiveSub}
              total={posts.length}
              counts={counts}
              allLabel={t.archive.all}
            />
          </div>
        </Reveal>

        <motion.div
          key={activeSub ?? "all"}
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

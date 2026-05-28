"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { MainCategory, Post } from "@/lib/types";
import { CategoryFilter } from "./CategoryFilter";
import { PostCard } from "./PostCard";
import { Reveal } from "@/components/motion/Reveal";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 24,
      mass: 0.9,
    },
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
      {/* Decorative top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-radial-glow opacity-70" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-sacred-600">
            Kategori · {posts.length} tulisan
          </p>
          <h1 className="serif-display mt-4 text-5xl leading-[1.02] tracking-tightest text-ink-900 sm:text-7xl">
            {category.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            {category.blurb}
          </p>
        </Reveal>

        {/* Filter rail */}
        <Reveal delay={0.1}>
          <div className="mt-12 border-y border-ink-900/10 py-5">
            <CategoryFilter
              subs={category.subcategories}
              active={activeSub}
              onSelect={setActiveSub}
              total={posts.length}
              counts={counts}
            />
          </div>
        </Reveal>

        {/* Animated grid */}
        <motion.div
          key={activeSub ?? "all"} // re-stagger on filter change
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                exit="exit"
                layout
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 rounded-3xl border border-dashed border-ink-900/15 bg-white/40 p-16 text-center"
          >
            <p className="serif-display text-3xl text-ink-900">
              Belum ada tulisan di sub-kategori ini.
            </p>
            <p className="mt-3 text-sm text-ink-500">
              Saya menulis pelan-pelan — coba lagi dalam beberapa hari, atau
              jelajah sub-kategori lain di atas.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

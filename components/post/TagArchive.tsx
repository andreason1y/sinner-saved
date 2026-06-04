"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { Post } from "@/lib/types";
import { PostCard } from "./PostCard";
import { useLocale } from "@/components/i18n/LocaleProvider";

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
};

export function TagArchive({ tag, posts }: { tag: string; posts: Post[] }) {
  const { locale } = useLocale();
  const isEn = locale === "en";

  const countLabel = isEn
    ? `${posts.length} ${posts.length === 1 ? "piece" : "pieces"} tagged`
    : `${posts.length} tulisan`;
  const backLabel = isEn ? "All posts" : "Semua tulisan";
  const emptyTitle = isEn ? "Nothing here yet." : "Belum ada tulisan.";
  const emptyBody = isEn
    ? "No published pieces carry this tag yet."
    : "Belum ada tulisan terbit dengan tag ini.";

  return (
    <section className="relative pb-32 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="kicker shrink-0 text-gold-600 dark:text-gold-300">
              {countLabel}
            </span>
            <span className="h-px flex-1 bg-gold-leaf" />
          </div>
          <h1 className="serif-display mt-6 break-words text-5xl font-medium leading-[1.04] text-ink-900 dark:text-ink-50 sm:text-7xl">
            <span className="text-gold-500 dark:text-gold-300">#</span>
            {tag}
          </h1>
          <Link
            href="/arsip"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
          >
            <ChevronLeft size={14} />
            {backLabel}
          </Link>
        </motion.div>

        {posts.length > 0 ? (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={cardVariants}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mt-20 rounded-3xl border border-dashed border-ink-900/15 bg-white/40 p-16 text-center dark:border-white/15 dark:bg-white/[0.02]">
            <p className="serif-display text-3xl text-ink-900 dark:text-ink-50">
              {emptyTitle}
            </p>
            <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
              {emptyBody}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

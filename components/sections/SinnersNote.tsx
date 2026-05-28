"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { getPostsByCategory } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

// Tiny extra notes to give the masonry uneven heights (Phase 1 visual)
type NoteCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  createdAt: string;
  subCategory: string;
  mainCategory: "sinners-note";
};

const EXTRA_NOTES: NoteCard[] = [
  {
    id: "n-extra-1",
    slug: "anugerah-seperti-hujan",
    title: "Anugerah itu seperti hujan di musim kering.",
    excerpt:
      "Datang tanpa diminta, basah tanpa permisi, dan meninggalkan tanah yang sebelumnya merasa tak akan pernah subur lagi.",
    createdAt: "2026-04-20T09:00:00Z",
    subCategory: "refleksi",
    mainCategory: "sinners-note",
  },
  {
    id: "n-extra-2",
    slug: "tentang-malu-yang-menjadi-pintu",
    title: "Tentang malu yang menjadi pintu.",
    excerpt:
      "Malu rohani sering dianggap musuh. Tapi bagi saya, ia justru sering jadi pintu kecil menuju ruangan yang dipenuhi cahaya — kalau saya berani membukanya.",
    createdAt: "2026-04-15T09:00:00Z",
    subCategory: "catatan",
    mainCategory: "sinners-note",
  },
];

export function SinnersNote() {
  const fromMock = getPostsByCategory("sinners-note", 4);
  const items: NoteCard[] = [
    ...fromMock.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      createdAt: p.createdAt,
      subCategory: p.subCategory,
      mainCategory: "sinners-note" as const,
    })),
    ...EXTRA_NOTES,
  ];

  return (
    <section id="sinners-note" className="relative py-24 sm:py-32">
      {/* Decorative side text */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 items-center justify-center lg:flex">
        <p className="serif-display rotate-90 text-sm uppercase tracking-[0.5em] text-ink-300">
          By a sinner — saved by grace
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="04 / Sinner's Note"
          title="Catatan kecil seorang pendosa."
          blurb="Refleksi yang jujur dan tidak rapi — fragmen-fragmen iman, kegagalan, dan anugerah yang menemukan saya berulang kali."
          href="/kategori/sinners-note"
        />

        <div className="mt-14 masonry">
          {items.map((post, i) => {
            // Vary visual treatment across cards
            const variant = i % 4;

            const baseCard =
              "block rounded-2xl p-6 transition-all hover:-translate-y-1";

            const variants = [
              "bg-white shadow-card ring-1 ring-ink-900/5 hover:shadow-card-hover",
              "bg-ink-900 text-ink-50 shadow-card hover:shadow-card-hover",
              "bg-parchment-deep ring-1 ring-ink-900/10 hover:ring-ink-900/20",
              "bg-gradient-to-br from-sacred-50 to-parchment-deep ring-1 ring-sacred-200/60",
            ];

            const isDark = variant === 1;

            return (
              <Reveal key={post.id} delay={i * 0.06}>
                <Link
                  href={`/${post.mainCategory}/${post.slug}`}
                  className={`${baseCard} ${variants[variant]}`}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em]">
                      <span
                        className={
                          isDark ? "text-sacred-300" : "text-sacred-600"
                        }
                      >
                        {post.subCategory.replace(/-/g, " ")}
                      </span>
                      <Quote
                        size={14}
                        className={isDark ? "text-ink-400" : "text-ink-400"}
                      />
                    </div>
                    <h3
                      className={`serif-display mt-4 text-xl leading-snug ${
                        isDark ? "text-ink-50" : "text-ink-900"
                      } ${variant === 0 ? "sm:text-2xl" : ""}`}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isDark ? "text-ink-300" : "text-ink-600"
                      }`}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className={`mt-5 flex items-center justify-between text-xs ${
                        isDark ? "text-ink-400" : "text-ink-500"
                      }`}
                    >
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="link-underline">Baca catatan →</span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

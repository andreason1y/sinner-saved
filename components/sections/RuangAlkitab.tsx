"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, RotateCw } from "lucide-react";
import { FlipCard } from "@/components/motion/FlipCard";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { BIBLICAL_FACTS } from "@/lib/mock-data";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function RuangAlkitab({ posts }: { posts: Post[] }) {
  const facts = BIBLICAL_FACTS.slice(0, 6);

  return (
    <section
      id="ruang-alkitab"
      className="relative py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(245,215,156,0.18) 50%, transparent 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="01 / Ruang Alkitab"
          title="Teks. Konteks. Bahasa asli."
          blurb="Membaca Kitab Suci dari latar sejarah, budaya, dan bahasa aslinya — tanpa kehilangan kehangatan iman."
          href="/kategori/ruang-alkitab"
        />

        {/* Biblical Facts — flip cards */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-ink-500">
            <BookOpen size={14} className="text-sacred-600" />
            <span>Biblical Facts</span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-ink-400">
              <RotateCw size={12} />
              Hover atau klik untuk membuka
            </span>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <FadeInUp key={fact.id}>
                <FlipCard
                  front={
                    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-ink-900 p-6 text-ink-50 shadow-card">
                      <div className="absolute inset-0 bg-radial-glow opacity-60" />
                      <div className="relative">
                        <p className="text-[10px] uppercase tracking-[0.32em] text-sacred-300">
                          Tahukah kamu?
                        </p>
                        <p className="serif-display mt-6 text-2xl leading-snug text-ink-50">
                          {fact.question}
                        </p>
                      </div>
                      <div className="relative flex items-center justify-between text-xs text-ink-300">
                        <span>{fact.reference}</span>
                        <span className="inline-flex items-center gap-1">
                          <RotateCw size={11} />
                          Balik kartu
                        </span>
                      </div>
                    </div>
                  }
                  back={
                    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-parchment-deep p-6 text-ink-900 shadow-card ring-1 ring-ink-900/10">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] text-sacred-700">
                          {fact.reference}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-ink-800">
                          {fact.answer}
                        </p>
                      </div>
                      <p className="mt-4 text-xs text-ink-500">
                        ✦ Sumber: catatan studi pribadi
                      </p>
                    </div>
                  }
                />
              </FadeInUp>
            ))}
          </StaggerContainer>
        </div>

        {/* Latest from Ruang Alkitab */}
        {posts.length > 0 && (
          <div className="mt-20">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-ink-500">
              <span>Tulisan terbaru di Ruang Alkitab</span>
              <Link
                href="/kategori/ruang-alkitab"
                className="text-ink-700 link-underline"
              >
                Selengkapnya →
              </Link>
            </div>
            <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <FadeInUp key={post.id}>
                  <Link
                    href={`/${post.mainCategory}/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    {post.cover && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-600">
                        {post.subCategory.replace(/-/g, " ")}
                      </p>
                      <h3 className="serif-display mt-3 text-xl leading-snug text-ink-900">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-600">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 text-xs text-ink-500">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </Link>
                </FadeInUp>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </section>
  );
}

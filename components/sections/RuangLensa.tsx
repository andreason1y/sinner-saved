"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function RuangLensa({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="ruang-lensa"
      className="relative bg-parchment-deep/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="03 / Ruang Lensa"
          title="Injil membaca dunia."
          blurb="Melihat budaya, tokoh, dan zaman lewat lensa Injil — sebuah cara berbeda untuk memandang yang biasa."
          href="/kategori/ruang-lensa"
        />

        {/* Horizontal scroll-rail of editorial cards */}
        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <FadeInUp key={post.id} className="group">
              <Link
                href={`/${post.mainCategory}/${post.slug}`}
                className="relative block h-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                {post.cover && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-sacred-300">
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {post.subCategory.replace(/-/g, " ")}
                      </p>
                      <h3 className="serif-display mt-2 text-xl leading-snug text-ink-50">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <p className="line-clamp-3 text-sm text-ink-600">
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
    </section>
  );
}

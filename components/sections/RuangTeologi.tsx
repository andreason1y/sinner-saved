"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { getPostsByCategory } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function RuangTeologi() {
  const posts = getPostsByCategory("ruang-teologi", 4);

  return (
    <section id="ruang-teologi" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="02 / Ruang Teologi"
          title="Berpikir dengan tertib di hadapan Allah."
          blurb="Bedah doktrin, apologetika, dan kritik yang sehat — supaya iman bukan sekadar perasaan, tapi keyakinan yang teruji."
          href="/kategori/ruang-teologi"
        />

        <StaggerContainer className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <FadeInUp key={post.id}>
              <motion.div
                whileHover={{ y: -6, scale: 1.012 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                  mass: 0.6,
                }}
              >
                <Link
                  href={`/${post.mainCategory}/${post.slug}`}
                  className="group relative block h-full overflow-hidden rounded-3xl bg-ink-950 text-ink-50 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  {post.cover && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-80 transition-all duration-[1200ms] ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                    </div>
                  )}
                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-sacred-300">
                      <span className="font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{post.subCategory.replace(/-/g, " ")}</span>
                    </div>
                    <h3 className="serif-display mt-4 text-2xl leading-snug text-ink-50 sm:text-3xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-ink-300">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-xs text-ink-300">
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="link-underline">Baca →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

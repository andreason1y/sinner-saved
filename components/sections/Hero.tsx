"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on scroll
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Word-level entrance (reveal the title word-by-word)
  const headline = ["Berpikir", "perlahan,", "membaca", "Alkitab", "dengan", "jujur."];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-sacred-100/40 via-transparent to-transparent" />
        <div className="grain-overlay absolute inset-0 opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
            delay: 0.2,
          }}
          className="flex items-center gap-3"
        >
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-sacred-500" />
            Issue 01 — Mei 2026
          </span>
          <span className="hidden text-xs uppercase tracking-[0.32em] text-ink-500 sm:inline">
            Independent Theological Journal
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          style={{ y: titleY, opacity: fade }}
          className="serif-display mt-8 max-w-5xl text-5xl leading-[1.02] tracking-tightest text-ink-900 sm:text-7xl lg:text-[8.5rem] lg:leading-[0.95]"
        >
          {headline.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 20,
                mass: 0.9,
                delay: 0.3 + i * 0.08,
              }}
              className="mr-3 inline-block overflow-hidden align-baseline"
            >
              <span className="inline-block">
                {word === "jujur." ? (
                  <span className="italic text-sacred-500">{word}</span>
                ) : (
                  word
                )}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub */}
        <motion.div
          style={{ y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 24,
            delay: 1.0,
          }}
          className="mt-10 grid gap-10 sm:grid-cols-12"
        >
          <p className="sm:col-span-7 sm:col-start-1 text-base leading-relaxed text-ink-700 sm:text-lg">
            <span className="font-medium text-ink-900">SinnerSaved</span> adalah
            jurnal teologi independen — tempat saya menulis pelan-pelan tentang
            teks Alkitab, doktrin, budaya, dan catatan-catatan pribadi seorang
            pendosa yang diselamatkan oleh kasih karunia.
          </p>
          <div className="sm:col-span-4 sm:col-start-9 flex flex-col items-start gap-4">
            <a
              href="#latest"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-parchment transition-transform hover:scale-[1.02]"
            >
              Mulai membaca
              <ArrowDown size={14} />
            </a>
            <a
              href="#ruang-alkitab"
              className="text-sm text-ink-700 link-underline"
            >
              Telusuri kategori →
            </a>
          </div>
        </motion.div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 overflow-hidden border-y border-ink-900/10 py-4"
        >
          <div className="flex animate-marquee gap-12 whitespace-nowrap text-sm uppercase tracking-[0.32em] text-ink-500">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0 gap-12">
                {[
                  "Sola Scriptura",
                  "Sola Fide",
                  "Sola Gratia",
                  "Solus Christus",
                  "Soli Deo Gloria",
                  "Coram Deo",
                  "Ad Fontes",
                ].map((s) => (
                  <span key={`${dup}-${s}`} className="flex items-center gap-12">
                    {s}
                    <span className="text-sacred-500">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

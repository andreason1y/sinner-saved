"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.1 }}
      className={cn(
        "sticky top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500",
        scrolled
          ? "border-b border-ink-900/10 bg-parchment/80 backdrop-blur-xl"
          : "border-b border-transparent bg-parchment/0"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="serif-display text-2xl tracking-tightest text-ink-900">
            Sinner<span className="italic text-sacred-500">Saved</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.32em] text-ink-500 sm:inline">
            est. 2026
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setActiveCategory(null)}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat.slug)}
            >
              <Link
                href={`/kategori/${cat.slug}`}
                className={cn(
                  "px-4 py-2 text-sm font-medium tracking-wide text-ink-700 transition-colors",
                  "hover:text-ink-900",
                  activeCategory === cat.slug && "text-ink-900"
                )}
              >
                {cat.name}
              </Link>
              <AnimatePresence>
                {activeCategory === cat.slug && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-3 right-3 h-px bg-ink-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Mega-dropdown */}
              <AnimatePresence>
                {activeCategory === cat.slug && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                    className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white/95 shadow-card-hover backdrop-blur-xl">
                      <div className="border-b border-ink-900/5 bg-parchment-deep/30 px-4 py-3">
                        <p className="serif-display text-sm text-ink-900">
                          {cat.name}
                        </p>
                        <p className="text-xs text-ink-500">{cat.tagline}</p>
                      </div>
                      <ul className="p-2">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/kategori/${cat.slug}/${sub.slug}`}
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-parchment-deep/50 hover:text-ink-900"
                            >
                              <span>{sub.name}</span>
                              <span className="text-ink-400 transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Cari"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-700 transition-colors hover:bg-white lg:inline-flex"
          >
            <Search size={16} />
          </button>
          <button
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-700 lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="overflow-hidden border-t border-ink-900/10 bg-parchment/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-5 py-5">
              <ul className="flex flex-col gap-4">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/kategori/${cat.slug}`}
                      onClick={() => setOpen(false)}
                      className="serif-display block text-2xl text-ink-900"
                    >
                      {cat.name}
                    </Link>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ink-500">
                      {cat.subcategories.map((s) => s.name).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

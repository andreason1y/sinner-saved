"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Mail, Search } from "lucide-react";
import { CATEGORIES, localizeCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t, locale } = useLocale();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global search shortcuts: "/" or ⌘/Ctrl+K open the search page — unless the
  // user is already typing into a field.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.isContentEditable);
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey;
      if (cmdK || (slash && !typing)) {
        e.preventDefault();
        router.push("/cari");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.1 }}
      className={cn(
        "sticky top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500",
        scrolled
          ? "border-b border-ink-900/10 bg-parchment/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/70"
          : "border-b border-transparent bg-parchment/0"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="serif-display text-[1.7rem] font-medium leading-none text-ink-900 dark:text-ink-50">
            Sinner<span className="italic text-gold-600 dark:text-gold-300">Saved</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setActiveCategory(null)}
        >
          {CATEGORIES.map((rawCat) => {
            const cat = localizeCategory(rawCat, locale);
            return (
            <div
              key={cat.slug}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat.slug)}
            >
              <Link
                href={`/kategori/${cat.slug}`}
                className={cn(
                  "px-4 py-2 text-sm font-medium tracking-wide text-ink-700 transition-colors dark:text-ink-200",
                  "hover:text-ink-900 dark:hover:text-ink-50",
                  activeCategory === cat.slug && "text-ink-900 dark:text-ink-50"
                )}
              >
                {cat.name}
              </Link>
              <AnimatePresence>
                {activeCategory === cat.slug && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-3 right-3 h-px bg-ink-900 dark:bg-ink-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeCategory === cat.slug && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white/95 shadow-card-hover backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/95">
                      <div className="border-b border-ink-900/5 bg-parchment-deep/30 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                        <p className="serif-display text-sm text-ink-900 dark:text-ink-50">
                          {cat.name}
                        </p>
                        <p className="text-xs text-ink-500 dark:text-ink-400">
                          {cat.tagline}
                        </p>
                      </div>
                      <ul className="p-2">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/kategori/${cat.slug}/${sub.slug}`}
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-parchment-deep/50 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-white/5 dark:hover:text-ink-50"
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
            );
          })}
          <Link
            href="/tentang"
            className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide text-ink-700 transition-colors hover:text-ink-900 dark:text-ink-200 dark:hover:text-ink-50"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide text-ink-700 transition-colors hover:text-ink-900 dark:text-ink-200 dark:hover:text-ink-50"
          >
            <Mail size={13} className="opacity-70" />
            {t.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cari"
            aria-label={t.nav.search}
            title={`${t.nav.search}  (/  ·  ⌘K)`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-700 transition-colors hover:text-ink-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:text-ink-50"
          >
            <Search size={16} />
          </Link>
          <LocaleToggle />
          <ThemeToggle />
          <button
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-100 lg:hidden"
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
            className="overflow-hidden border-t border-ink-900/10 bg-parchment/95 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/95 lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-5 py-5">
              <ul className="flex flex-col gap-4">
                {CATEGORIES.map((rawCat) => {
                  const cat = localizeCategory(rawCat, locale);
                  return (
                  <li key={cat.slug}>
                    <Link
                      href={`/kategori/${cat.slug}`}
                      onClick={() => setOpen(false)}
                      className="serif-display block text-2xl text-ink-900 dark:text-ink-50"
                    >
                      {cat.name}
                    </Link>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                      {cat.subcategories.map((s) => s.name).join(" · ")}
                    </p>
                  </li>
                  );
                })}
                <li>
                  <Link
                    href="/cari"
                    onClick={() => setOpen(false)}
                    className="serif-display flex items-center gap-2 text-2xl text-ink-900 dark:text-ink-50"
                  >
                    <Search size={20} className="opacity-70" />
                    {t.nav.search}
                  </Link>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                    {t.search.intro}
                  </p>
                </li>
                <li>
                  <Link
                    href="/tentang"
                    onClick={() => setOpen(false)}
                    className="serif-display block text-2xl text-ink-900 dark:text-ink-50"
                  >
                    {t.nav.about}
                  </Link>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                    {t.footer.tagline.split(",")[0]}
                  </p>
                </li>
                <li>
                  <Link
                    href="/kontak"
                    onClick={() => setOpen(false)}
                    className="serif-display block text-2xl text-ink-900 dark:text-ink-50"
                  >
                    {t.nav.contact}
                  </Link>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                    {t.nav.contactSubs}
                  </p>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

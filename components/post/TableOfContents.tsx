"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const { t } = useLocale();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 1] }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={t.post.toc}
      className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto pl-8 lg:block"
    >
      <p className="text-[10px] uppercase tracking-[0.32em] text-sacred-600 dark:text-sacred-300">
        {t.post.toc}
      </p>
      <ul className="mt-4 space-y-2 border-l border-ink-900/10 dark:border-white/10">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${item.id}`);
                  }
                }}
                className={cn(
                  "relative block py-1 pl-4 text-sm transition-colors",
                  item.level === 3 && "pl-7 text-[13px]",
                  isActive
                    ? "text-ink-900 dark:text-ink-50"
                    : "text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="toc-active-marker"
                    className="absolute -left-px top-0 h-full w-px bg-ink-900 dark:bg-ink-50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

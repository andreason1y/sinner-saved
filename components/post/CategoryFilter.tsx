"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Sub = { slug: string; name: string };

export function CategoryFilter({
  subs,
  active,
  onSelect,
  total,
  counts,
  allLabel = "Semua",
}: {
  subs: Sub[];
  active: string | null;
  onSelect: (slug: string | null) => void;
  total: number;
  counts: Record<string, number>;
  allLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterPill
        label={allLabel}
        count={total}
        isActive={active === null}
        onClick={() => onSelect(null)}
      />
      {subs.map((s) => (
        <FilterPill
          key={s.slug}
          label={s.name}
          count={counts[s.slug] ?? 0}
          isActive={active === s.slug}
          onClick={() => onSelect(s.slug)}
        />
      ))}
    </div>
  );
}

function FilterPill({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors",
        isActive
          ? "border-ink-900 text-parchment dark:border-ink-50 dark:text-ink-950"
          : "border-ink-900/15 text-ink-700 hover:text-ink-900 dark:border-white/15 dark:text-ink-200 dark:hover:text-ink-50"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="filter-active-bg"
          className="absolute inset-0 -z-10 rounded-full bg-ink-900 dark:bg-ink-50"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
            mass: 0.6,
          }}
        />
      )}
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
          isActive
            ? "bg-parchment/20 text-parchment dark:bg-ink-950/20 dark:text-ink-950"
            : "bg-ink-900/5 text-ink-500 dark:bg-white/5 dark:text-ink-400"
        )}
      >
        {count}
      </span>
    </button>
  );
}

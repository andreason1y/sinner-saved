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
}: {
  subs: Sub[];
  active: string | null;
  onSelect: (slug: string | null) => void;
  total: number;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterPill
        label="Semua"
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
          ? "border-ink-900 text-parchment"
          : "border-ink-900/15 text-ink-700 hover:text-ink-900"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="filter-active-bg"
          className="absolute inset-0 -z-10 rounded-full bg-ink-900"
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
          isActive ? "bg-parchment/20 text-parchment" : "bg-ink-900/5 text-ink-500"
        )}
      >
        {count}
      </span>
    </button>
  );
}

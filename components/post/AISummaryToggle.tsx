"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ChevronDown, Loader2 } from "lucide-react";
import { generateSummaryAction } from "@/lib/actions/ai";

type Props = {
  postId: string;
  locale: "id" | "en";
  initialSummary?: string;
};

export function AISummaryToggle({ postId, locale, initialSummary }: Props) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(initialSummary ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const label = locale === "en" ? "AI Summary" : "Ringkasan AI";
  const loadingLabel =
    locale === "en" ? "Generating summary…" : "Membuat ringkasan…";

  async function handleToggle() {
    const next = !open;
    setOpen(next);
    if (next && !summary && !loading) {
      setLoading(true);
      setError("");
      try {
        const res = await generateSummaryAction(postId, locale);
        if (res.summary) setSummary(res.summary);
        else setError(res.error ?? "Gagal membuat ringkasan.");
      } catch {
        setError(
          locale === "en"
            ? "Failed to generate summary. Please try again."
            : "Gagal membuat ringkasan. Coba lagi sebentar."
        );
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="mb-10 overflow-hidden rounded-2xl border border-sacred-300/50 bg-sacred-50/60 dark:border-sacred-300/15 dark:bg-sacred-300/[0.06]">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left"
      >
        <span className="inline-flex items-center gap-2 text-sm font-medium text-sacred-700 dark:text-sacred-200">
          <Sparkles size={15} />
          {label}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-sacred-600 transition-transform dark:text-sacred-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="border-t border-sacred-300/40 px-5 py-4 text-[15px] leading-relaxed text-ink-700 dark:border-sacred-300/15 dark:text-ink-200">
              {loading ? (
                <span className="inline-flex items-center gap-2 text-ink-500 dark:text-ink-400">
                  <Loader2 size={14} className="animate-spin" />
                  {loadingLabel}
                </span>
              ) : error ? (
                <span className="text-crimson-600 dark:text-crimson-400">
                  {error}
                </span>
              ) : (
                <p className="whitespace-pre-line">{summary}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ compact }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Mode terang" : "Mode gelap"}
      title={isDark ? "Mode terang" : "Mode gelap"}
      className={`relative inline-flex ${compact ? "h-9 w-9" : "h-9 w-9"} items-center justify-center rounded-full border border-ink-900/10 bg-white/60 text-ink-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:bg-white/[0.08]`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 22,
            mass: 0.5,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

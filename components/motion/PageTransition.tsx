"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Lightweight enter animation on every route change. Keyed by pathname so it
 * re-runs when navigating. Kept fast (≈0.28s) so the page feels responsive —
 * the route-level loading.tsx skeletons handle the "instant feedback" while
 * the server renders, and this polishes the moment content arrives.
 *
 * Honors prefers-reduced-motion by rendering a plain container.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10, scale: 0.994 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

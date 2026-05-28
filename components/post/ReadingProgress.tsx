"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sacred-500 via-sacred-400 to-crimson-500"
      aria-hidden
    />
  );
}

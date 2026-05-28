"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  /** Subtle = reading lists. Lift = hero/feature cards. */
  intensity?: "subtle" | "lift";
};

/**
 * Spring-physics hover card. Slight scale + drop-shadow grow + image-zoom hook.
 * Children that opt into image zoom should add the `group-hover:scale-[1.06]` class.
 */
export function MotionCard({
  children,
  className,
  href,
  intensity = "lift",
}: MotionCardProps) {
  const lift = intensity === "lift" ? -6 : -3;
  const scale = intensity === "lift" ? 1.015 : 1.008;

  const content = (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition-shadow",
        "hover:shadow-card-hover",
        className
      )}
      initial={false}
      whileHover={{ y: lift, scale }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        mass: 0.6,
      }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block focus:outline-none">
        {content}
      </a>
    );
  }
  return content;
}

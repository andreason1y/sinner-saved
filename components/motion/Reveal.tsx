"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 24,
      mass: 0.9,
    },
  },
};

type StaggerProps = React.ComponentPropsWithoutRef<typeof motion.div> & {
  amount?: number;
  once?: boolean;
};

export function StaggerContainer({
  className,
  children,
  amount = 0.2,
  once = true,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type FadeInUpProps = React.ComponentPropsWithoutRef<typeof motion.div> & {
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "h2" | "h3" | "p";
};

export function FadeInUp({
  className,
  children,
  delay = 0,
  as = "div",
  ...props
}: FadeInUpProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      variants={itemVariants}
      transition={{ ...itemVariants.visible, delay } as never}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Standalone fade-in-up — when you need a single element to animate in
 * without being inside a StaggerContainer.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 24,
        mass: 0.9,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

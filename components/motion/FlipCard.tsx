"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  /** Trigger flip on hover (desktop) and click (touch). Both supported. */
};

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={cn("perspective h-80 w-full", className)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 0.9,
        }}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0">{front}</div>

        {/* Back */}
        <div className="backface-hidden rotate-y-180 absolute inset-0">
          {back}
        </div>
      </motion.div>
    </div>
  );
}

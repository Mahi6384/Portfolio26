"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Fade + rise on scroll into view.
 * The `data-reveal` marker lets a reduced-motion CSS rule force it visible
 * (see globals.css), so we never branch on useReducedMotion (which would cause
 * an SSR/client hydration mismatch).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A single line that rises out from behind a mask, for big editorial headlines.
 * Plays on mount (not on scroll-into-view): it's used for the above-the-fold hero
 * headline, which must reveal reliably on load. `data-reveal` still lets the
 * reduced-motion CSS force it visible.
 */
export function MaskLine({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        data-reveal
        className={cn("block", className)}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

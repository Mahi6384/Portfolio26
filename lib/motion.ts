import type { Variants, Transition } from "framer-motion";

/** Signature easing — expo-out. Used everywhere for that "settled" editorial feel. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 };

/** Fade + rise, for section blocks entering the viewport. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Stagger container. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** A single line mask-reveal (used for hero headline lines). */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Simple fade. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Viewport trigger config shared by scroll-reveal blocks. */
export const inView = { once: true, amount: 0.35 } as const;

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot + a lagging ring that grows and labels itself
 * over interactive elements. Desktop / fine-pointer only; hidden otherwise.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const raw = { x: useMotionValue(-100), y: useMotionValue(-100) };
  const ring = {
    x: useSpring(raw.x, { stiffness: 350, damping: 30, mass: 0.4 }),
    y: useSpring(raw.y, { stiffness: 350, damping: 30, mass: 0.4 }),
  };
  const hidden = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      raw.x.set(e.clientX);
      raw.y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea, [data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    const leave = () => {
      hidden.current = true;
      raw.x.set(-100);
      raw.y.set(-100);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: raw.x, y: raw.y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60"
        style={{ x: ring.x, y: ring.y }}
        animate={{
          width: label ? 68 : hovering ? 44 : 30,
          height: label ? 68 : hovering ? 44 : 30,
          backgroundColor: hovering ? "var(--accent-soft)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}

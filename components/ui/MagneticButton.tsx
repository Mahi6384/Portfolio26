"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  strength?: number;
  cursorLabel?: string;
  external?: boolean;
  ariaLabel?: string;
};

const variants = {
  solid:
    "bg-accent text-accent-ink hover:brightness-105 border border-transparent",
  outline:
    "bg-transparent text-fg border border-line-strong hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-fg border border-transparent hover:text-accent",
};

/** A button/link with a subtle magnetic pull toward the cursor (desktop only). */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "solid",
  strength = 0.35,
  cursorLabel,
  external,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-[filter,color,border-color] duration-300",
    variants[variant],
    className
  );

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={base}
      data-cursor={cursorLabel}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto") || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel}
          className="inline-block"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-block">
      {inner}
    </button>
  );
}

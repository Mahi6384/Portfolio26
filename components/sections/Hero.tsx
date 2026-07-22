"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/data/site";
import { MaskLine } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Pill } from "@/components/ui/Pill";
import { scrollToId } from "@/components/layout/SmoothScroll";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(560px circle at ${gx}% ${gy}%, var(--accent-soft), transparent 65%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {/* pointer-tracked accent glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <Pill dot={site.status.open}>{site.status.label}</Pill>
          <Pill>{site.location}</Pill>
        </motion.div>

        <h1 className="font-display display-xl uppercase text-fg">
          <MaskLine delay={0.05}>I build</MaskLine>
          <MaskLine delay={0.15} className="text-accent">
            AI&#8288;-native
          </MaskLine>
          <MaskLine delay={0.25}>
            products<span className="text-accent">.</span>
          </MaskLine>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.firstName} Jain, a <span className="text-fg">{site.role.toLowerCase()}</span> in{" "}
            {site.location.split(",")[0]} shipping{" "}
            <span className="font-serif-italic text-accent">AI-native</span> software from database
            to interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton onClick={() => scrollToId("work")} variant="solid" cursorLabel="View">
              View work <ArrowDown size={15} />
            </MagneticButton>
            <MagneticButton href={site.resume} variant="outline" cursorLabel="PDF" external>
              Résumé <ArrowUpRight size={15} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}

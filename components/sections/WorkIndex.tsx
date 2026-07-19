"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WorkIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });

  function onMove(e: React.MouseEvent) {
    x.set(e.clientX);
    y.set(e.clientY);
  }

  return (
    <Section id="work">
      <SectionHeading index="04" kicker="Selected work" title="Things I've built" />

      <div
        className="mt-14 border-t border-line"
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
      >
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={0.03 * i}>
            <Link
              href={`/work/${p.slug}`}
              onMouseEnter={() => setHovered(i)}
              data-cursor="Open"
              className="group relative flex flex-col gap-4 border-b border-line py-8 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-9"
            >
              {/* accent wash on hover */}
              <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-accent-soft to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="font-mono text-xs text-faint transition-colors group-hover:text-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-4xl uppercase leading-none tracking-tight text-fg transition-transform duration-300 group-hover:translate-x-1 sm:text-6xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-muted sm:text-base">
                    {p.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 pl-10 sm:pl-0">
                {/* mobile inline thumb */}
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line sm:hidden">
                  <Cover project={p} />
                </div>

                <div className="hidden text-right sm:block">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider ${
                      p.status === "Live" ? "text-accent" : "text-faint"
                    }`}
                  >
                    {p.status}
                  </span>
                  <p className="mt-1 max-w-[180px] font-mono text-[11px] text-faint">
                    {p.stack.slice(0, 3).join(" · ")}
                  </p>
                </div>
                <ArrowUpRight
                  className="text-faint transition-all duration-300 group-hover:rotate-0 group-hover:text-accent sm:-rotate-45"
                  size={26}
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Floating cursor-following preview (desktop) */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="preview"
            className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-52 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line-strong shadow-2xl lg:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <Cover project={projects[hovered]} />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Cover({ project }: { project: (typeof projects)[number] }) {
  if (project.cover.src) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes="320px"
        className="object-cover"
      />
    );
  }
  // Branded placeholder for projects without a screenshot yet.
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-elevated to-surface">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(120px circle at 30% 20%, var(--accent-soft), transparent 70%)",
        }}
      />
      <span className="font-display text-3xl uppercase tracking-tight text-fg/90">
        {project.name}
      </span>
    </div>
  );
}

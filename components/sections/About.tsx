"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/data/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CodePanel } from "@/components/ui/CodePanel";

const stats = [
  { value: "15+", label: "reusable React components" },
  { value: "20%", label: "faster UI dev cycles" },
  { value: "30%", label: "less backend load" },
  { value: "2", label: "interns mentored" },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="kicker flex items-center gap-3">
              <span className="text-accent">01</span> About
            </span>
          </Reveal>
          <div className="mt-8 space-y-6">
            {site.about.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-balance text-xl leading-relaxed text-fg/90 sm:text-2xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i}>
                <div>
                  <div className="font-display text-4xl text-accent sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm leading-snug text-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-md lg:ml-auto"
          >
            <CodePanel />
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border border-accent/30" />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

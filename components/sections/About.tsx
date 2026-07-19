"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/data/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "500+", label: "users on shipped payment flows" },
  { value: "15+", label: "reusable UI components built" },
  { value: "4", label: "full-stack products shipped" },
  { value: "3", label: "engineers mentored" },
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
            className="group relative mx-auto max-w-sm lg:ml-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border border-line-strong">
              <Image
                src="/me.jpg"
                alt="Mahi Jain"
                width={640}
                height={800}
                className="h-auto w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="rounded-full border border-line-strong bg-bg/70 px-3 py-1 font-mono text-[11px] text-fg backdrop-blur">
                  {site.education.degree} · {site.education.period}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border border-accent/30" />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

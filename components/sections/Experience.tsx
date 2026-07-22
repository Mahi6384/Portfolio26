"use client";

import { experience } from "@/lib/data/experience";
import { site } from "@/lib/data/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Pill";

export function Experience() {
  return (
    <Section id="experience" className="pb-12 sm:pb-14">
      <SectionHeading index="02" kicker="Experience" title="Where I've shipped" />

      <div className="mt-16 border-t border-line">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={0.04 * i}>
            <div className="group grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-fg sm:text-3xl">
                    {job.company}
                  </h3>
                  {job.current && (
                    <span className="flex items-center gap-1.5 rounded-full border border-accent/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Now
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-fg/80">{job.role}</p>
                <p className="mt-1 font-mono text-xs text-faint">{job.period}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="text-lg text-fg/80">{job.summary}</p>
                <ul className="mt-6 space-y-3">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl uppercase text-fg">Education</p>
            <p className="text-sm text-muted">
              {site.education.degree} · {site.education.school}, {site.education.place}
              <span className="ml-3 font-mono text-xs text-faint">
                {site.education.period}
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

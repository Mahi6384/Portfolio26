"use client";

import { skills } from "@/lib/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading index="03" kicker="Skills" title="The toolkit" />

      <div className="mt-16 border-t border-line">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={0.03 * i}>
            <div className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-center md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-wider text-faint">
                  0{i + 1}
                </span>
                <h3 className="mt-1 font-display text-xl uppercase tracking-tight text-fg">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5 md:col-span-9">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-4 py-2 text-sm text-fg/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

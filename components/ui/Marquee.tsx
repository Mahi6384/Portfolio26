"use client";

import { cn } from "@/lib/utils";

/** Infinite horizontal marquee. Duplicates its items so the loop is seamless. */
export function Marquee({
  items,
  duration = 32,
  className,
  separator = "✦",
}: {
  items: string[];
  duration?: number;
  className?: string;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-display text-2xl uppercase tracking-tight text-muted transition-colors sm:text-4xl">
            {it}
          </span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-mask relative flex overflow-hidden", className)}>
      <div
        className="flex animate-marquee whitespace-nowrap"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

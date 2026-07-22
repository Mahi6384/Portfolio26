"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A faux editor window that types itself out.
 *
 * The typewriter is pure CSS: each line is clipped by an animated `width` in `ch`
 * units (monospace, so 1ch === 1 character) driven by `steps()`, staggered by a delay
 * proportional to the characters before it. No JS, no hooks, so it renders identically
 * on the server and the client (no hydration mismatch), and the global
 * `prefers-reduced-motion` rule in globals.css collapses the animations to their
 * finished state automatically.
 */

type Tok = { t: string; c?: string };

const KW = "text-[#c084fc]"; // keywords
const KEY = "text-[#7dd3fc]"; // property keys
const STR = "text-accent"; // strings, on-brand lime
const BOOL = "text-[#fbbf24]"; // booleans
const PUNC = "text-muted"; // braces, colons, commas
const ID = "text-fg"; // identifiers

const LINES: Tok[][] = [
  [
    { t: "const", c: KW },
    { t: " " },
    { t: "mahi", c: ID },
    { t: " " },
    { t: "=", c: PUNC },
    { t: " " },
    { t: "{", c: PUNC },
  ],
  [
    { t: "  role", c: KEY },
    { t: ":", c: PUNC },
    { t: " " },
    { t: '"full-stack developer"', c: STR },
    { t: ",", c: PUNC },
  ],
  [
    { t: "  based", c: KEY },
    { t: ":", c: PUNC },
    { t: " " },
    { t: '"Bangalore, India"', c: STR },
    { t: ",", c: PUNC },
  ],
  [
    { t: "  focus", c: KEY },
    { t: ":", c: PUNC },
    { t: " " },
    { t: '"AI-native products"', c: STR },
    { t: ",", c: PUNC },
  ],
  [
    { t: "  stack", c: KEY },
    { t: ":", c: PUNC },
    { t: " " },
    { t: "[", c: PUNC },
    { t: '"Next.js"', c: STR },
    { t: ", ", c: PUNC },
    { t: '"TypeScript"', c: STR },
    { t: "]", c: PUNC },
    { t: ",", c: PUNC },
  ],
  [
    { t: "  loves", c: KEY },
    { t: ":", c: PUNC },
    { t: " " },
    { t: "[", c: PUNC },
    { t: '"Postgres"', c: STR },
    { t: ", ", c: PUNC },
    { t: '"agentic AI"', c: STR },
    { t: "]", c: PUNC },
    { t: ",", c: PUNC },
  ],
  [
    { t: "  shipping", c: KEY },
    { t: ":", c: PUNC },
    { t: " " },
    { t: "true", c: BOOL },
    { t: ",", c: PUNC },
  ],
  [
    { t: "}", c: PUNC },
    { t: ";", c: PUNC },
  ],
  [],
  [
    { t: "export", c: KW },
    { t: " " },
    { t: "default", c: KW },
    { t: " " },
    { t: "mahi", c: ID },
    { t: ";", c: PUNC },
  ],
];

const PER_CHAR = 0.03; // seconds per character
const LINE_PAUSE = 4; // characters' worth of pause between lines

/** Precomputed at module scope, deterministic, so SSR and client agree. */
const TIMED = (() => {
  let acc = 0;
  const rows = LINES.map((toks) => {
    const chars = toks.reduce((n, tok) => n + tok.t.length, 0);
    const delay = acc * PER_CHAR;
    const dur = Math.max(chars, 1) * PER_CHAR;
    acc += chars + LINE_PAUSE;
    return { toks, chars, delay, dur };
  });
  return { rows, total: acc * PER_CHAR };
})();

export function CodePanel({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Hold the typewriter until the panel is actually on screen, so the reader
  // sees it type rather than arriving at finished code.
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      data-typing={inView ? "on" : undefined}
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-[#0b0b0d] shadow-2xl",
        className
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="ml-3 font-mono text-[11px] text-faint">mahi.ts</span>
        <span className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
          TS
        </span>
      </div>

      {/* code */}
      <div className="overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-[1.75] sm:px-5 sm:text-[13.5px]">
        {TIMED.rows.map((row, i) => {
          const isLast = i === TIMED.rows.length - 1;
          return (
            <div key={i} className="flex gap-4">
              <span className="w-4 shrink-0 select-none text-right text-faint/50">
                {i + 1}
              </span>
              {row.chars === 0 ? (
                <span aria-hidden>&nbsp;</span>
              ) : (
                <span
                  className="code-line"
                  style={
                    {
                      "--tw": `${row.chars}ch`,
                      "--steps": row.chars,
                      "--dur": `${row.dur}s`,
                      "--delay": `${row.delay}s`,
                    } as CSSProperties
                  }
                >
                  {row.toks.map((tok, j) => (
                    <span key={j} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                </span>
              )}
              {isLast && (
                <span
                  aria-hidden
                  className="code-caret -ml-3 inline-block h-[1.05em] w-[7px] translate-y-[3px] bg-accent"
                  style={{ animationDelay: `${TIMED.total}s` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* status bar */}
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
          ▸ building
        </span>
        <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
          <span
            className="code-progress block h-full rounded-full bg-accent"
            style={{ "--pw": "74%" } as CSSProperties}
          />
        </span>
        <span className="font-mono text-[10px] text-faint">74%</span>
      </div>
    </div>
  );
}

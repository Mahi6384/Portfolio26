import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Pill({
  children,
  className,
  dot,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted backdrop-blur",
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}

/** Small tech tag chip. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg">
      {children}
    </span>
  );
}

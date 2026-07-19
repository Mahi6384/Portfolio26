"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

/**
 * Lazy live-site preview. Loads the real site in an iframe only on click
 * (avoids perf hit + login redirects on load). Always offers an "open in new tab"
 * fallback in case the site blocks framing (X-Frame-Options).
 */
export function LivePreview({ url, chrome }: { url: string; chrome?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-elevated shadow-xl">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-1 font-mono text-[11px] text-faint">
          {chrome || url}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:text-accent"
        >
          Open <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="relative aspect-[16/10] w-full">
        {loaded ? (
          <iframe
            src={url}
            title={`Live preview of ${chrome || url}`}
            className="h-full w-full bg-white"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="group flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-elevated to-surface"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent transition-transform group-hover:scale-110">
              <Play size={22} className="ml-1" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Load live preview
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

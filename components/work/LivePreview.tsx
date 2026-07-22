import { ArrowUpRight } from "lucide-react";

/**
 * Live site preview, loaded eagerly.
 *
 * The iframe mounts with the page so the real site is already loading by the time the
 * reader scrolls down to it, with no click-to-load gate. A shimmer sits behind the frame so
 * the slot never looks empty while the site boots, and the "Open ↗" link is always there
 * as a fallback if a site ever refuses to be framed.
 */
export function LivePreview({ url, chrome }: { url: string; chrome?: string }) {
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
        {/* sits behind the iframe so the slot is never blank while the site boots */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-elevated to-surface">
          <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
            Loading live site…
          </span>
        </div>
        <iframe
          src={url}
          title={`Live preview of ${chrome || url}`}
          className="relative h-full w-full bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}

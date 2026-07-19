import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/** A framed project visual: browser or phone chrome wrapping a screenshot or branded placeholder. */
export function ProjectCover({
  project,
  priority = false,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const { cover } = project;

  const media = cover.src ? (
    <Image
      src={cover.src}
      alt={cover.alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 900px"
      className="object-cover object-top"
    />
  ) : (
    <BrandedPlaceholder project={project} />
  );

  if (cover.frame === "phone") {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="relative w-full max-w-[300px]">
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-line-strong bg-elevated p-2 shadow-2xl">
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-bg" />
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem]">
              {media}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // browser frame
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line-strong bg-elevated shadow-2xl",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        {cover.chrome && (
          <span className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-1 font-mono text-[11px] text-faint">
            {cover.chrome}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10]">{media}</div>
    </div>
  );
}

function BrandedPlaceholder({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-elevated to-surface">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 30% 15%, var(--accent-soft), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <span className="relative font-mono text-[11px] uppercase tracking-widest text-accent">
        {project.status}
      </span>
      <span className="relative mt-3 px-6 text-center font-display text-4xl uppercase leading-none tracking-tight text-fg sm:text-5xl">
        {project.name}
      </span>
      <span className="relative mt-4 max-w-xs px-6 text-center text-sm text-muted">
        {project.blurb}
      </span>
    </div>
  );
}

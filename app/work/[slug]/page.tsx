import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";
import { projects, getProject, getAdjacentProject } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { ProjectCover } from "@/components/work/ProjectCover";
import { LivePreview } from "@/components/work/LivePreview";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Pill";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} · ${p.tagline}`;
  return {
    title: p.name,
    description: p.blurb,
    openGraph: {
      title,
      description: p.blurb,
      url: `${site.url}/work/${p.slug}`,
      images: [`/work/${p.slug}/opengraph-image`],
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(slug);
  const index = projects.findIndex((p) => p.slug === slug) + 1;

  return (
    <article className="px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mt-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider text-faint">
              <span className="text-accent">0{index}</span>
              <span>{project.year}</span>
              <span>·</span>
              <span
                className={project.status === "Live" ? "text-accent" : "text-muted"}
              >
                {project.status}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display display-lg mt-5 uppercase leading-[0.9] text-fg">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-xl text-fg/80 sm:text-2xl">
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <MagneticButton href={project.liveUrl} variant="solid" cursorLabel="Live" external>
                  <Globe size={15} /> Live site <ArrowUpRight size={14} />
                </MagneticButton>
              )}
              {project.repoUrl && (
                <MagneticButton href={project.repoUrl} variant="outline" cursorLabel="Code" external>
                  <Github size={15} /> Source
                </MagneticButton>
              )}
              {project.linkedinUrl && (
                <MagneticButton href={project.linkedinUrl} variant="ghost" cursorLabel="Post" external>
                  Launch post <ArrowUpRight size={14} />
                </MagneticButton>
              )}
            </div>
          </Reveal>
        </header>

        {/* Cover */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <ProjectCover project={project} priority />
          </div>
        </Reveal>

        {/* Meta row */}
        <div className="mt-16 grid gap-8 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((m, i) => (
            <Reveal key={m.label} delay={0.04 * i}>
              <div>
                <div className="font-display text-4xl text-accent">{m.value}</div>
                <div className="mt-2 text-sm text-muted">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Role + stack */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="kicker">Role</span>
              <p className="mt-3 text-fg">{project.role}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <span className="kicker">Stack</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Problem / Approach */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="kicker flex items-center gap-3">
                <span className="text-accent">→</span> The problem
              </span>
              <p className="mt-5 text-lg leading-relaxed text-fg/80">{project.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <span className="kicker flex items-center gap-3">
                <span className="text-accent">→</span> The approach
              </span>
              <p className="mt-5 text-lg leading-relaxed text-fg/80">{project.approach}</p>
            </div>
          </Reveal>
        </div>

        {/* Architecture highlights */}
        <div className="mt-24">
          <Reveal>
            <h2 className="font-display display-md uppercase text-fg">
              Under the hood
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.05 * i}>
                <div className="h-full rounded-2xl border border-line bg-surface/40 p-7 transition-colors hover:border-accent/40">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-fg">
                        {h.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{h.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <Reveal>
            <h2 className="font-display display-md uppercase text-fg">What it does</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <Reveal key={f} delay={0.02 * i}>
                <div className="flex items-center gap-4 border-b border-line py-4">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg/85">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Live preview */}
        {project.liveUrl && (
          <div className="mt-24">
            <Reveal>
              <div className="mb-8 flex items-end justify-between gap-6">
                <h2 className="font-display display-md uppercase text-fg">See it live</h2>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
                >
                  Open ↗
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <LivePreview url={project.liveUrl} chrome={project.cover.chrome} />
            </Reveal>
          </div>
        )}

        {/* Next project */}
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="Next"
            className="group mt-28 flex flex-col gap-2 border-t border-line pt-10 transition-colors sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-faint">
                Next project
              </span>
              <p className="mt-2 font-display text-4xl uppercase text-fg transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">
                {next.name}
              </p>
            </div>
            <ArrowUpRight
              size={40}
              className="text-faint transition-all duration-300 group-hover:text-accent"
            />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

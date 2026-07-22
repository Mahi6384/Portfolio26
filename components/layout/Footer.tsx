"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { site } from "@/lib/data/site";
import { scrollToId } from "./SmoothScroll";

const socials = [
  { href: site.socials.github, label: "GitHub", icon: <FaGithub /> },
  { href: site.socials.linkedin, label: "LinkedIn", icon: <FaLinkedin /> },
  { href: site.socials.leetcode, label: "LeetCode", icon: <SiLeetcode /> },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line px-5 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="kicker">Currently open to new roles</p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Email"
              className="font-display display-md mt-4 block uppercase leading-none text-fg transition-colors hover:text-accent"
            >
              Let&apos;s build
              <br />
              something.
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {s.icon}
              </a>
            ))}
            <button
              onClick={() => scrollToId("top")}
              aria-label="Back to top"
              data-cursor="Top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.name} · {site.location}</span>
          <div className="flex items-center gap-5">
            <Link href="/#work" className="link-underline hover:text-muted">
              Work
            </Link>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-muted">
              Résumé
            </a>
            <a href={`mailto:${site.email}`} className="link-underline hover:text-muted">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

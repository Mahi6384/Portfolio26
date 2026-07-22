"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { site } from "@/lib/data/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type State = "idle" | "sending" | "sent" | "error";

const socials = [
  { href: site.socials.github, label: "GitHub", handle: "Mahi6384", icon: <FaGithub /> },
  { href: site.socials.linkedin, label: "LinkedIn", handle: "mahijain6384", icon: <FaLinkedin /> },
  { href: site.socials.leetcode, label: "LeetCode", handle: "Mahij_12", icon: <SiLeetcode /> },
];

export function Contact() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot tripped
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Section id="contact" className="pb-10">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="kicker flex items-center gap-3">
              <span className="text-accent">05</span> Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display display-lg mt-6 uppercase leading-[0.95] text-fg">
              Have an idea?
              <br />
              <span className="text-accent">Let&apos;s talk.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-muted">
              Open to full-stack and AI engineering roles, freelance builds, and interesting
              collaborations. The fastest way to reach me is email.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Email"
              className="link-underline mt-8 inline-block font-display text-2xl text-fg sm:text-3xl"
            >
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={s.label}
                  className="group flex items-center justify-between border-b border-line py-3.5 transition-colors hover:border-accent/40"
                >
                  <span className="flex items-center gap-3 text-fg">
                    <span className="text-lg text-muted transition-colors group-hover:text-accent">
                      {s.icon}
                    </span>
                    {s.label}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-xs text-faint">
                    @{s.handle}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-5">
              {/* honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />
              <Field label="Name">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="input"
                  autoComplete="email"
                />
              </Field>
              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  className="input resize-none"
                />
              </Field>

              <div className="flex items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={state === "sending" || state === "sent"}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="Send"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink transition-[filter] hover:brightness-105 disabled:opacity-70"
                >
                  {state === "sending" && <Loader2 size={16} className="animate-spin" />}
                  {state === "sent" && <Check size={16} />}
                  {state === "sending" ? "Sending…" : state === "sent" ? "Sent, thank you" : "Send message"}
                </motion.button>
                {state === "error" && (
                  <span className="text-sm text-red-400">{error}</span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          color: var(--fg);
          font-size: 0.95rem;
          transition: border-color 0.25s;
        }
        :global(.input::placeholder) {
          color: var(--faint);
        }
        :global(.input:focus) {
          outline: none;
          border-color: var(--accent);
        }
      `}</style>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-faint">
        {label}
      </span>
      {children}
    </label>
  );
}

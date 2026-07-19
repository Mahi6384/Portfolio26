"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Command as CommandIcon,
  Copy,
  FileText,
  Github,
  Home,
  Linkedin,
  Moon,
  Search,
  SunMedium,
  Code2,
  Briefcase,
  User,
  Layers,
  Mail,
  FolderGit2,
} from "lucide-react";
import { site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { scrollToId } from "./SmoothScroll";
import { useTheme } from "./ThemeProvider";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
  keywords?: string;
};

const Ctx = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return useContext(Ctx);
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { theme, toggle } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, [setOpen]);

  const go = useCallback(
    (id: string) => {
      close();
      if (window.location.pathname !== "/") {
        router.push("/#" + id);
      } else {
        scrollToId(id);
      }
    },
    [close, router]
  );

  const commands = useMemo<Cmd[]>(() => {
    const nav: Cmd[] = [
      { id: "top", label: "Home", group: "Navigate", icon: <Home size={16} />, run: () => go("top") },
      { id: "about", label: "About", group: "Navigate", icon: <User size={16} />, run: () => go("about") },
      { id: "experience", label: "Experience", group: "Navigate", icon: <Briefcase size={16} />, run: () => go("experience") },
      { id: "skills", label: "Skills", group: "Navigate", icon: <Layers size={16} />, run: () => go("skills") },
      { id: "work", label: "Work", group: "Navigate", icon: <FolderGit2 size={16} />, run: () => go("work") },
      { id: "contact", label: "Contact", group: "Navigate", icon: <Mail size={16} />, run: () => go("contact") },
    ];
    const work: Cmd[] = projects.map((p) => ({
      id: "work-" + p.slug,
      label: p.name,
      hint: "Case study",
      group: "Projects",
      icon: <Code2 size={16} />,
      keywords: p.tagline,
      run: () => {
        close();
        router.push("/work/" + p.slug);
      },
    }));
    const actions: Cmd[] = [
      {
        id: "resume",
        label: "Download résumé",
        group: "Actions",
        icon: <FileText size={16} />,
        run: () => {
          close();
          window.open(site.resume, "_blank");
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        group: "Actions",
        icon: <Copy size={16} />,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          close();
        },
      },
      {
        id: "theme",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        icon: theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />,
        run: () => {
          toggle();
        },
      },
    ];
    const links: Cmd[] = [
      { id: "github", label: "GitHub", group: "Links", icon: <Github size={16} />, run: () => { close(); window.open(site.socials.github, "_blank"); } },
      { id: "linkedin", label: "LinkedIn", group: "Links", icon: <Linkedin size={16} />, run: () => { close(); window.open(site.socials.linkedin, "_blank"); } },
      { id: "leetcode", label: "LeetCode", group: "Links", icon: <ArrowUpRight size={16} />, run: () => { close(); window.open(site.socials.leetcode, "_blank"); } },
    ];
    return [...nav, ...work, ...actions, ...links];
  }, [go, close, router, theme, toggle]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      (c.label + " " + (c.hint ?? "") + " " + (c.keywords ?? "") + " " + c.group)
        .toLowerCase()
        .includes(q)
    );
  }, [query, commands]);

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // Focus input + reset when opened.
  useEffect(() => {
    if (open) {
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  }

  // Keep active row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-elevated shadow-2xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-faint"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-muted">No results.</div>
              )}
              {filtered.map((c, i) => {
                const showGroup = c.group !== lastGroup;
                lastGroup = c.group;
                return (
                  <div key={c.id}>
                    {showGroup && (
                      <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-faint">
                        {c.group}
                      </div>
                    )}
                    <button
                      data-idx={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => c.run()}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === active ? "bg-accent-soft text-fg" : "text-muted"
                      }`}
                    >
                      <span className={i === active ? "text-accent" : "text-faint"}>
                        {c.icon}
                      </span>
                      <span className="flex-1">{c.label}</span>
                      {c.hint && (
                        <span className="font-mono text-[11px] text-faint">{c.hint}</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
              <span className="flex items-center gap-1.5">
                <CommandIcon size={11} /> Command palette
              </span>
              <span>↑↓ navigate · ↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

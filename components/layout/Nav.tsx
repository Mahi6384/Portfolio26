"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { site } from "@/lib/data/site";
import { scrollToId } from "./SmoothScroll";
import { useCommandPalette } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setOpen } = useCommandPalette();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(id: string) {
    setMenuOpen(false);
    if (pathname !== "/") {
      router.push("/#" + id);
    } else {
      scrollToId(id);
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[150] transition-all duration-300",
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToId("top");
              }
            }}
            className="group flex items-center gap-2 font-display text-lg uppercase tracking-tight"
            aria-label="Mahi Jain — home"
          >
            <span className="text-fg">Mahi</span>
            <span className="text-accent transition-transform group-hover:translate-x-0.5">
              Jain
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              data-cursor="⌘K"
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-fg sm:flex"
            >
              <Search size={14} />
              <span className="font-mono">
                <kbd className="tracking-wider">⌘K</kbd>
              </span>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg md:hidden"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[140] bg-bg/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col justify-center gap-1 px-8">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-line py-4 text-left font-display text-4xl uppercase text-fg"
                >
                  <span className="mr-4 font-mono text-xs text-accent">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setOpen(true);
                }}
                className="mt-8 flex items-center gap-2 text-sm text-muted"
              >
                <Search size={14} /> Search — press ⌘K
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";
import { CommandPalette, CommandPaletteProvider } from "./CommandPalette";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "./Cursor";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <CommandPaletteProvider>
          <SmoothScroll>
            <div className="grain" aria-hidden />
            <Cursor />
            <Nav />
            <main id="top">{children}</main>
            <Footer />
            <CommandPalette />
          </SmoothScroll>
        </CommandPaletteProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

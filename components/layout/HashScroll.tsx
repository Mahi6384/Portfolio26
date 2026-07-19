"use client";

import { useEffect } from "react";
import { scrollToId } from "./SmoothScroll";

/** On load, if the URL has a #hash (e.g. arriving from a case-study page), scroll to it. */
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const t = setTimeout(() => scrollToId(hash), 260);
    return () => clearTimeout(t);
  }, []);
  return null;
}

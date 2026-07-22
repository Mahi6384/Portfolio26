import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-accent">Error 404</span>
      <h1 className="font-display display-lg mt-6 uppercase text-fg">Lost the thread</h1>
      <p className="mt-4 max-w-sm text-muted">
        This page doesn&apos;t exist, but there&apos;s plenty worth seeing back home.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
        Back home
      </Link>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Standard section wrapper: id anchor, scroll offset, consistent padding + max width. */
export function Section({
  id,
  children,
  className,
  full,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32", className)}
    >
      <div className={cn(!full && "mx-auto w-full max-w-7xl")}>{children}</div>
    </section>
  );
}

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  kicker,
  title,
  className,
}: {
  index?: string;
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        <Reveal>
          <span className="kicker flex items-center gap-3">
            {index && <span className="text-accent">{index}</span>}
            {kicker}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display display-md mt-4 max-w-2xl uppercase text-fg">
            {title}
          </h2>
        </Reveal>
      </div>
    </div>
  );
}

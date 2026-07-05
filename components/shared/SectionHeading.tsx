import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <p className="eyebrow mb-3.5">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-[2.25rem] leading-[1.1] text-balance text-text-primary md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

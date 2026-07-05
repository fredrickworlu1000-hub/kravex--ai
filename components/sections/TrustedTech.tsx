import { techStack } from "@/data/techStack";
import { Reveal } from "@/components/shared/Reveal";

export function TrustedTech() {
  const loop = [...techStack, ...techStack];

  return (
    <section className="section-py-tight border-y border-border" aria-label="Technology integrations">
      <div className="container-px mx-auto max-w-content">
        <Reveal>
          <p className="eyebrow mb-7 text-center md:text-left">
            Integrated with the tools you already run on
          </p>
        </Reveal>
      </div>
      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 md:w-24" />
        <div className="flex w-max animate-marquee gap-12 [animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= techStack.length ? "true" : undefined}
              className="font-mono text-sm uppercase tracking-wider text-text-muted whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

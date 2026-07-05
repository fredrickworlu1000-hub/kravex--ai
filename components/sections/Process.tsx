import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowRight } from "lucide-react";

export function Process() {
  return (
    <section id="process" className="section-py bg-surface/40 border-y border-border">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="How it works"
          title="A four-step process, in that order, every time."
          description="No phase starts until the one before it is validated against your real data."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08} className="bg-bg">
              <div className="group h-full p-8 transition-colors duration-300 hover:bg-surface">
                <span className="font-mono text-sm text-accent">{step.step}</span>
                <h3 className="mt-4 font-display text-xl text-text-primary md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center gap-2 border-t border-border pt-8">
            <p className="text-sm text-text-muted">Ready to start with the audit?</p>
            <a
              href="#cta"
              className="group inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-glow"
            >
              Book your audit call
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

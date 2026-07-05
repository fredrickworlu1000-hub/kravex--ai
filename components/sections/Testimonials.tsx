import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="section-py bg-surface/40 border-y border-border">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Client voices"
          title="What it's like to work with us."
          description="Placeholder copy — to be replaced with real client testimonials as Milestone 1 case studies are confirmed."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <Quote className="h-4 w-4 text-accent/60" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-5 text-sm leading-relaxed text-text-muted">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

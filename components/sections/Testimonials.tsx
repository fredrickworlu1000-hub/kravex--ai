import { founderNote } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="section-py bg-surface/40 border-y border-border">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Why Kravex AI"
          title="Built from a real problem."
        />

        <Reveal delay={0.08}>
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border bg-surface p-8 md:p-10">
            <Quote className="h-5 w-5 text-accent/60" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-5 text-base leading-relaxed text-text-muted">
              {founderNote.quote}
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-sm text-text-primary">{founderNote.name}</p>
              <p className="text-xs text-text-muted">{founderNote.title}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
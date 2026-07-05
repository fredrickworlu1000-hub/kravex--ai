import { caseStudies } from "@/data/caseStudies";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export function CaseStudies() {
  return (
    <section id="case-studies" className="section-py">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems shipped for real teams, real volume."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.5)]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {study.tag}
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-snug text-text-primary md:text-2xl">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {study.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="font-display text-3xl text-accent">{study.metric}</p>
                  <p className="mt-1 text-xs text-text-muted">{study.metricLabel}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { services } from "@/data/services";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowRight } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="section-py">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="What we build"
          title="Automation systems built around how leads actually move."
          description="Each engagement is scoped around your real workflow — not a generic template. Here's what that typically includes."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.07}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.5)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-raised transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/[0.08]">
                  <service.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-text-muted transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-6 font-display text-xl text-text-primary md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center gap-2 border-t border-border pt-8">
            <p className="text-sm text-text-muted">Not sure which fits your team?</p>
            <a
              href="#cta"
              className="group inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-glow"
            >
              Let&apos;s scope it together
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
import { pricingPlans, carePlan } from "@/data/pricing";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="section-py">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Pricing"
          title="Packages built to grow with you."
          description="Start with a professional site, or go straight to a system that captures, qualifies, and follows up with leads on its own."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={(i % 3) * 0.07}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ease-out",
                  plan.highlight
                    ? "border-accent/40 bg-surface shadow-[0_12px_32px_-16px_rgba(232,169,58,0.25)]"
                    : "border-border bg-surface hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.5)]"
                )}
              >
                {plan.highlight && (
                  <span className="eyebrow mb-4 inline-block w-fit rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1">
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-xl text-text-primary md:text-2xl">
                  {plan.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {plan.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-3xl text-text-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-muted">{plan.period}</span>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        strokeWidth={2}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlight ? "primary" : "secondary"}
                  size="lg"
                  asChild
                  className="mt-8 w-full"
                >
                  <a href={plan.href}>{plan.cta}</a>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-lg text-text-primary">
                {carePlan.name}{" "}
                <span className="ml-1 font-sans text-sm font-normal text-text-muted">
                  · ongoing add-on for any package
                </span>
              </p>
              <p className="mt-1 text-sm text-text-muted">
                {carePlan.description}
              </p>
            </div>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-display text-xl text-text-primary">{carePlan.price}</span>
              <span className="text-sm text-text-muted">{carePlan.period}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-10 text-center text-sm text-text-muted">
            Not sure which fits?{" "}
            <a href="#cta" className="font-medium text-accent transition-colors hover:text-accent-glow">
              Let&apos;s scope it together
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

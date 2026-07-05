import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";

export function FinalCTA() {
  return (
    <section id="cta" className="section-py">
      <div className="container-px mx-auto max-w-content">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center md:px-16 md:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-[90px]"
            />
            <p className="eyebrow mb-5 justify-center flex">Ready when you are</p>
            <h2 className="font-display text-[2.5rem] leading-[1.1] text-balance text-text-primary sm:text-5xl md:text-[3.5rem]">
              Let&apos;s put your pipeline on autopilot.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-text-muted">
              Book a 20-minute call. We&apos;ll look at your current lead flow and
              tell you exactly where automation pays off first.
            </p>
            <div className="mt-9 flex justify-center">
              <Button size="lg" asChild className="group">
                <a href="mailto:hello@kravex.ai">
                  Book a strategy call
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

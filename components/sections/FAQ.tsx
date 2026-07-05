import { faqs } from "@/data/faq";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="section-py">
      <div className="container-px mx-auto max-w-content grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <SectionHeading eyebrow="Questions" title="Everything you'd ask before a call." />
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm text-text-muted">
              Don&apos;t see your question?{" "}
              <a
                href="mailto:hello@kravex.ai"
                className="font-medium text-accent transition-colors hover:text-accent-glow"
              >
                Email us directly
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

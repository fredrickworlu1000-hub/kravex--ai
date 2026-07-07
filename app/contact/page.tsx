import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/shared/contactForm";
import { Reveal } from "@/components/shared/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Kravex AI what you need automated.",
};

const DETAILS = [
  { icon: Mail, label: "Email", value: "hello@kravex.ai", href: "mailto:hello@kravex.ai" },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
  { icon: MessageSquare, label: "What to include", value: "Your current lead flow and where it breaks down" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="section-py">
        <div className="container-px mx-auto max-w-content">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow mb-4">Get in touch</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-display text-[2.5rem] leading-[1.1] text-balance text-text-primary sm:text-5xl">
                  Tell us what your pipeline looks like today.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-text-muted">
                  A few sentences is enough to get started. We&apos;ll reply
                  with whether automation makes sense for your team.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="mt-10 space-y-6">
                  {DETAILS.map((detail) => (
                    <li key={detail.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                        <detail.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a href={detail.href} className="text-sm text-text-primary transition-colors hover:text-accent">
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-sm text-text-primary">{detail.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="rounded-3xl border border-border bg-surface p-8 md:p-10">
              <ContactForm variant="full" />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
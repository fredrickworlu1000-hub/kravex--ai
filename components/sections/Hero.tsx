"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PipelineDiagram } from "@/components/shared/PipelineDiagram";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container-px mx-auto grid max-w-content items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow mb-5">
            AI Automation Studio
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-[2.75rem] leading-[1.08] text-balance text-text-primary sm:text-6xl md:text-[4.5rem] md:leading-[1.05]"
          >
            Your leads deserve a{" "}
            <span className="text-accent">pipeline that never sleeps.</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-text-muted md:text-lg"
          >
            Kravex AI builds the automation infrastructure behind your lead
            capture, qualification, and outreach — so every inquiry gets a
            response in minutes, not days.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" asChild className="group">
              <a href="#cta">
                Book a strategy call
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#case-studies">See the work</a>
            </Button>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-11 flex items-center gap-5 text-[11px] font-mono uppercase tracking-wider text-text-muted"
          >
            <span>Real estate</span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span>Outreach</span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span>CRM ops</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <PipelineDiagram />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FileInput, Sparkles, Database, Send } from "lucide-react";

const nodes = [
  { Icon: FileInput, label: "Lead in", x: 13, y: 165 },
  { Icon: Sparkles, label: "AI agent", x: 246, y: 55 },
  { Icon: Database, label: "CRM sync", x: 246, y: 270 },
  { Icon: Send, label: "Outreach", x: 469, y: 165 },
];

const paths = [
  "M 70 200 C 150 200 150 90 250 90",
  "M 70 200 C 150 200 150 310 250 310",
  "M 310 90 C 400 90 400 200 490 200",
  "M 310 310 C 400 310 400 200 490 200",
];

export function PipelineDiagram() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <svg
        viewBox="0 0 560 400"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram of a lead moving through an AI qualification agent, CRM sync, and into automated outreach"
      >
        {paths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#2A2A31"
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 * i, ease: "easeInOut" }}
          />
        ))}
        {paths.map((d, i) => (
          <motion.circle
            key={`pulse-${d}`}
            r={3}
            fill="#E8A93A"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.2,
              delay: 1 + i * 0.5,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "easeInOut",
            }}
          >
            <animateMotion dur="2.2s" repeatCount="indefinite" path={d} begin={`${1 + i * 0.5}s`} />
          </motion.circle>
        ))}
      </svg>

      <div className="absolute inset-0" aria-hidden="true">
        {nodes.map(({ Icon, label, x, y }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            style={{ left: `${(x / 560) * 100}%`, top: `${(y / 400) * 100}%` }}
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-transform duration-300 ${
                label === "AI agent"
                  ? "border-accent/40 bg-accent/[0.08] shadow-[0_0_18px_-6px_rgba(232,169,58,0.35)]"
                  : "border-border bg-surface-raised"
              }`}
            >
              <Icon
                aria-hidden="true"
                className={label === "AI agent" ? "h-6 w-6 text-accent" : "h-6 w-6 text-text-muted"}
                strokeWidth={1.5}
              />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

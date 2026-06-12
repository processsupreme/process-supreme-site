"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidField } from "@/components/ui/LiquidField";
import { OdometerNumber } from "@/components/ui/OdometerNumber";

/**
 * Our own numbers: the case study summary with the outcomes as big
 * numerals. Plain header, full contrast, no costume.
 */

const slideIn = {
  initial: { y: 8 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-10%" as const },
};

const outcomes = [
  { value: "30 → 0", label: "minutes of daily reporting, per store, per manager" },
  { value: "1 day → 1 hr", label: "quarterly compliance filing, zero resubmissions" },
  { value: "0", label: "violations across years of regulated operation" },
];

export function Proof() {
  return (
    <section id="numbers" className="relative bg-well border-y border-line scroll-mt-14 overflow-hidden">
      <LiquidField className="absolute inset-0" intensity={0.55} />
      <div className="absolute inset-0 bg-well/65" aria-hidden />
      <div className="relative max-w-container mx-auto px-6 lg:px-10 py-band">
        <p className="font-mono text-tele-sm uppercase text-amber mb-3">
          Our own numbers
        </p>
        <h2 className="font-display font-bold text-heading text-fg max-w-[34ch]">
          From cannabis retail and cultivation, one of the hardest categories
          in retail.
        </h2>
        <p className="mt-4 font-mono text-tele text-mute max-w-[58ch] leading-[1.8]">
          regulated, margin-thin, manual everything. our own multi-location
          operation, run lean by engines we built on the floor:{" "}
          <span className="text-amber">purchasing_intelligence</span> ·{" "}
          <span className="text-amber">executive_intelligence</span> ·{" "}
          <span className="text-amber">bonus_engine</span> ·{" "}
          <span className="text-amber">daily_ops_report</span> ·{" "}
          <span className="text-amber">compliance_reporting</span>
        </p>

        <div className="mt-10 max-w-[54rem] border-t border-line">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              {...slideIn}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5 border-b border-line/70"
            >
              <span className="font-display text-numeral text-amber tabular min-w-[230px]">
                <OdometerNumber value={o.value} startOnView />
              </span>
              <span className="text-body-sm text-mute">{o.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-7 font-mono text-tele text-mute">
          ✓ hard mode, made lean.{" "}
          <Link href="/proof" className="text-amber hover:text-amber-bright transition-colors">
            read the full case study →
          </Link>
        </p>

        {/* Handoff */}
        <p className="mt-6 font-mono text-tele">
          <a href="#is-this-you" className="text-steel hover:text-amber transition-colors">
            that was us. is it you? ↓
          </a>
        </p>
      </div>
    </section>
  );
}

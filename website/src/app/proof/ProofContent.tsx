"use client";

import { motion } from "framer-motion";
import { CommandLink } from "@/components/ui/CommandLink";
import { TerminalPanel, type TerminalLine } from "@/components/ui/TerminalPanel";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";
import { LiquidField } from "@/components/ui/LiquidField";

/**
 * The cannabis case study as a full flight-recorder playback: one
 * continuous timestamped log from conditions through engines to
 * outcomes. Stats render as instrument numerals inside the sequence.
 */

const conditions = [
  "effective tax rates that punish every wasted dollar",
  "a dozen software systems that only integrate on the basics",
  "quarterly state reporting, formatted to the regulator's exact spec",
  "labor as the largest controllable cost, scheduled by gut feel",
  "high turnover, strict labor law, audit-ready or else",
];

const engines = [
  {
    name: "purchasing_intelligence",
    glyph: "purchasing" as GlyphName,
    title: "The buy, run by math",
    note: "orders sized by sell-through, payment terms computed from days-on-shelf, suppliers graded S through D, dead capital named and priced. then the create-PO button: one click turns the whole buy into formatted order spreadsheets, one per location. work that takes buyers hours, done with a button.",
    chips: [
      { v: "4,400+", k: "SKUs" },
      { v: "143", k: "brands" },
      { v: "$929K", k: "float surfaced" },
      { v: "1 click", k: "full PO run" },
    ],
  },
  {
    name: "executive_intelligence",
    glyph: "executive" as GlyphName,
    title: "The whole company on one screen",
    note: "executive summary, month-over-month, store performance, year-end summary, brand reports, EBITDA. every number from the same source, so nobody argues about whose spreadsheet is right.",
    chips: [
      { v: "5M+", k: "transactions analyzed" },
      { v: "7", k: "stores" },
      { v: "317", k: "brands" },
      { v: "6", k: "report suites" },
    ],
  },
  {
    name: "bonus_engine",
    glyph: "bonus" as GlyphName,
    title: "Bonuses nobody argues with",
    note: "monthly bonuses for every budtender, measured against the average of their own shift at their own store. tiered, exported per store for payroll, and next month's goals drafted automatically in the same run.",
    chips: [
      { v: "144", k: "budtenders" },
      { v: "7", k: "stores" },
      { v: "8 hrs → 2 min", k: "per run" },
    ],
  },
  {
    name: "daily_ops_report",
    glyph: "reporting" as GlyphName,
    title: "Every store's day, in one morning email",
    note: "sales, orders, average order value, blended margin, cash, and shift breakdowns for every location, pulled overnight and delivered before anyone walks in. replaced manager-built reports with one source of truth.",
    chips: [
      { v: "6:30 AM", k: "every day" },
      { v: "7", k: "locations" },
      { v: "15", k: "leaders + board" },
      { v: "0", k: "manager input" },
    ],
  },
  {
    name: "compliance_reporting",
    glyph: "compliance" as GlyphName,
    title: "State filings without the fire drill",
    note: "quarterly state filings generated straight from system exports, entity details filled in, formatted to spec. high-stakes data entry became a push of a button.",
    chips: [
      { v: "1 day → 1 hr", k: "per filing" },
      { v: "0", k: "resubmissions" },
    ],
  },
];

/** purchasing_intelligence, live: rounded figures from our own deployment */
const deployment = [
  { v: "4,400+", k: "SKUs managed live" },
  { v: "143", k: "brands under power rankings" },
  { v: "7", k: "locations on one screen" },
  { v: "$929K", k: "monthly cash float exposure surfaced" },
  { v: "$207K", k: "overstock flagged for action in one view" },
  { v: "568", k: "stockout risks caught, reorders pre-drafted" },
  { v: "1,700+", k: "line items across 38 brands built into orders in one pass" },
];

const outcomes = [
  { value: "30 → 0", label: "minutes of daily reporting, per store, per manager" },
  { value: "1 day → 1 hr", label: "quarterly compliance filing, zero resubmissions" },
  { value: "8 hrs → 2 min", label: "performance bonus math, every pay period" },
  { value: "0", label: "violations across years of operation" },
];

const bootLines: TerminalLine[] = [
  {
    segments: [
      { text: "$ ", role: "prompt" },
      { text: "open case_study", role: "command" },
    ],
    delay: 0,
  },
  {
    segments: [{ text: "→ where: regulated retail + cultivation", role: "muted" }],
    delay: 1.0,
  },
  {
    segments: [{ text: "→ scale: multi-location, hundreds of employees", role: "muted" }],
    delay: 1.5,
  },
  {
    segments: [{ text: "→ condition: nothing off the shelf could run it", role: "muted" }],
    delay: 2.0,
  },
  {
    segments: [{ text: "✓ ready", role: "success" }],
    delay: 2.7,
    spaceBefore: true,
  },
];

const fadeIn = {
  initial: { y: 8 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-10%" as const },
};

function Stamp({ t }: { t: string }) {
  return <span className="font-mono text-tele tabular text-steel pt-1">{t}</span>;
}

export function ProofContent() {
  return (
    <>
      {/* Recorder head */}
      <section className="relative border-b border-line overflow-hidden">
        <LiquidField className="absolute inset-0" intensity={0.5} />
        <div className="absolute inset-0 bg-deck/60" aria-hidden />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-14 md:py-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <p className="font-mono text-tele-sm uppercase mb-4 text-amber">
              Case study
            </p>
            <h1 className="font-display text-hero text-fg max-w-[14ch]">
              Hard mode, <span className="text-amber">made lean.</span>
            </h1>
            <p className="mt-6 font-mono text-tele text-mute max-w-[56ch] leading-[1.8]">
              <span className="text-dim">{"// "}</span>cannabis retail and
              cultivation. our own operation. one of the most regulated,
              margin-thin categories in retail, run lean by engines we built
              on the floor.
            </p>
          </div>
          <TerminalPanel title="case_study" tag="our own numbers" lines={bootLines} />
        </div>
      </section>

      {/* T+0 conditions */}
      <section className="bg-well border-b border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <div className="grid grid-cols-[58px_1fr] sm:grid-cols-[84px_1fr] gap-4">
            <Stamp t="01" />
            <div>
              <h2 className="font-display font-bold text-heading text-fg mb-6">
                The conditions
              </h2>
              <ul className="max-w-[44rem]">
                {conditions.map((c, i) => (
                  <motion.li
                    key={c}
                    {...fadeIn}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex gap-4 items-baseline py-3 border-b border-line/70 last:border-b-0 font-mono text-tele"
                  >
                    <span className="text-steel tabular shrink-0">C-{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-mute">{c}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-body-sm text-mute max-w-[58ch]">
                Most operators in the category lose money. The ones that
                survive do it on discipline. Every hour of manual work and
                every untrusted number costs margin the taxes have not already
                taken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* T+1 engines */}
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <div className="grid grid-cols-[58px_1fr] sm:grid-cols-[84px_1fr] gap-4">
            <Stamp t="02" />
            <div>
              <h2 className="font-display font-bold text-heading text-fg mb-2">
                The engines, built on the floor
              </h2>
              <p className="font-mono text-tele text-dim mb-8">
                five engines, each one a job nobody does by hand anymore
              </p>
              <div className="max-w-[52rem]">
                {engines.map((e, i) => (
                  <motion.div
                    key={e.name}
                    {...fadeIn}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="py-7 border-b border-line last:border-b-0 grid md:grid-cols-[240px_1fr] gap-x-8 gap-y-3"
                  >
                    <p className="font-mono text-tele text-amber flex items-start gap-2.5">
                      <Glyph name={e.glyph} className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{e.name}</span>
                    </p>
                    <div>
                      <h3 className="font-display font-bold text-fg text-[1.05rem] tracking-[-0.01em]">
                        {e.title}
                      </h3>
                      <p className="mt-2 font-mono text-tele text-mute leading-[1.8]">
                        <span className="text-dim">{"// "}</span>
                        {e.note}
                      </p>
                      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-tele-sm uppercase">
                        {e.chips.map((c) => (
                          <span key={c.k} className="flex items-baseline gap-1.5 whitespace-nowrap">
                            <span className="text-amber tabular normal-case text-tele">{c.v}</span>
                            <span className="text-dim">{c.k}</span>
                          </span>
                        ))}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* T+2 purchasing_intelligence deployment */}
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <div className="grid grid-cols-[58px_1fr] sm:grid-cols-[84px_1fr] gap-4">
            <Stamp t="03" />
            <div className="w-full">
              <h2 className="font-display font-bold text-heading text-fg mb-2">
                purchasing_intelligence, running today
              </h2>
              <p className="font-mono text-tele text-dim mb-8 max-w-[64ch] leading-[1.8]">
                what the flagship engine does for us, every day. rounded
                figures from the live deployment, not a promise of yours.
              </p>
              <div className="max-w-[50rem] border-t border-line">
                {deployment.map((d, i) => (
                  <motion.div
                    key={d.k}
                    {...fadeIn}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4 border-b border-line/70"
                  >
                    <span className="font-display text-numeral text-amber tabular w-[150px]">
                      {d.v}
                    </span>
                    <span className="text-body-sm text-mute">{d.k}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* T+3 outcomes */}
      <section className="relative bg-well border-b border-line overflow-hidden">
        <div className="absolute inset-0 aurora" aria-hidden />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-band">
          <div className="grid grid-cols-[58px_1fr] sm:grid-cols-[84px_1fr] gap-4">
            <Stamp t="04" />
            <div className="w-full">
              <h2 className="font-display font-bold text-heading text-fg mb-8">
                The results
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-14 gap-y-9 max-w-[46rem]">
                {outcomes.map((o, i) => (
                  <motion.div key={o.label} {...fadeIn} transition={{ duration: 0.4, delay: i * 0.08 }}>
                    <p className="font-display text-numeral text-amber tabular">{o.value}</p>
                    <p className="mt-2.5 text-body-sm text-mute max-w-[32ch]">{o.label}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-10 font-mono text-tele-sm uppercase text-dim">
                figures from our own multi-location operation in nevada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* End of log */}
      <section>
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <div className="grid grid-cols-[58px_1fr] sm:grid-cols-[84px_1fr] gap-4 items-baseline">
            <Stamp t="05" />
            <div>
              <p className="font-mono text-tele text-ok mb-6">
                ✓ hard mode, made lean.
              </p>
              <p className="text-body-lg text-fg max-w-[40ch] mb-8">
                Your industry has its own hard mode. If we could cut fat here,
                we can cut it in your operation.
              </p>
              <CommandLink href="/contact">tell us where it hurts</CommandLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

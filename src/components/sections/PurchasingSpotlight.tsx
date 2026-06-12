"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";
import { OdometerNumber } from "@/components/ui/OdometerNumber";
import { PoBuilderDemo } from "@/components/demos/PoBuilderDemo";
import { CashSplitDemo } from "@/components/demos/CashSplitDemo";
import { TermsDemo } from "@/components/demos/TermsDemo";
import { RankingsDemo } from "@/components/demos/RankingsDemo";
import { DeadCapitalDemo } from "@/components/demos/DeadCapitalDemo";

/**
 * The flagship exhibit: anatomy of an engine. purchasing_intelligence is
 * the deepest engine we run in production; five levers, each shown as a
 * live instrument vignette inside one console frame. For any operator
 * with SKUs, suppliers, and shelves.
 */

const levers = [
  {
    id: "LV-01",
    name: "po_builder",
    glyph: "purchasing" as GlyphName,
    title: "Orders sized by sell-through, not gut",
    note: "every suggested order is computed, case-rounded, MOQ-aware, split per store. the math is on screen because you should never trust a number you can't check. then one click on create PO turns the whole buy into formatted order sheets, one per location.",
    Demo: PoBuilderDemo,
  },
  {
    id: "LV-02",
    name: "cash_split",
    glyph: "billing" as GlyphName,
    title: "Cash flow control inside the buy",
    note: "what must be ordered today versus what can wait without a stockout. one glance decides what this week's cash actually has to cover.",
    Demo: CashSplitDemo,
  },
  {
    id: "LV-03",
    name: "payment_terms",
    glyph: "labor" as GlyphName,
    title: "Payment terms backed by your own data",
    note: "if their product sits 53 days and you pay net 30, you are financing their inventory for 23 days. your shelf data is negotiation ammunition.",
    Demo: TermsDemo,
  },
  {
    id: "LV-04",
    name: "power_rankings",
    glyph: "bonus" as GlyphName,
    title: "Suppliers graded by what they earn you",
    note: "revenue, profit, margin, momentum, minus aging and excess. who earns shelf space, who is renting it from you, and a report clean enough to send them.",
    Demo: RankingsDemo,
  },
  {
    id: "LV-05",
    name: "dead_capital",
    glyph: "inventory" as GlyphName,
    title: "Dead capital, named and priced",
    note: "stockout risks counted, overstock priced, dead products listed with trapped dollars and the action that frees them.",
    Demo: DeadCapitalDemo,
  },
];

const proofStats = [
  { v: "4,400+", k: "SKUs live" },
  { v: "143", k: "brands managed" },
  { v: "7", k: "locations" },
  { v: "$929K", k: "monthly float surfaced" },
  { v: "568", k: "stockout risks pre-drafted" },
];

const AUTO_ADVANCE_MS = 12000;

export function PurchasingSpotlight() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (reduced || pinned) return;
    const t = setInterval(() => setActive((a) => (a + 1) % levers.length), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [reduced, pinned]);

  const lever = levers[active];

  return (
    <section id="purchasing" className="relative py-band md:py-band-lg bg-well border-y border-line scroll-mt-14 overflow-hidden">
      <div className="absolute inset-0 aurora" aria-hidden />
      <div className="relative max-w-container mx-auto px-3 sm:px-6 lg:px-10">
        {/* Title plate */}
        <div className="px-3 sm:px-0 mb-10">
          <p className="font-mono text-tele-sm uppercase text-amber mb-3">
            How deep an engine goes
          </p>
          <h2 className="font-display text-section text-fg max-w-[20ch]">
            This is how deep an engine goes when{" "}
            <span className="text-amber">buying is your biggest line.</span>
          </h2>
          <p className="mt-4 font-mono text-tele text-mute max-w-[60ch] leading-[1.8]">
            <span className="text-dim">{"// "}</span>if you buy inventory from
            vendors, five levers sit between you and a leaner operation:
            orders sized by math, cash split by urgency, terms backed by your
            own shelf, suppliers graded, dead capital named. one engine pulls
            all five.
          </p>
        </div>

        {/* Console frame */}
        <div className="glass rounded-panel overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-line font-mono text-tele-sm uppercase">
            <span className="flex items-center gap-2.5 text-dim">
              <span className="w-[7px] h-[7px] rounded-full bg-amber" aria-hidden />
              purchasing_intelligence · five levers
            </span>
            <span className="text-dim">example data</span>
          </div>

          {/* Lever switcher */}
          <div className="flex border-b border-line font-mono text-tele overflow-x-auto" role="tablist" aria-label="Purchasing intelligence levers">
            {levers.map((lv, i) => (
              <button
                key={lv.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => {
                  setActive(i);
                  setPinned(true);
                }}
                className={`px-4 py-3.5 border-r border-line whitespace-nowrap transition-colors ${
                  active === i ? "bg-well text-amber" : "text-mute hover:text-fg hover:bg-panel-up"
                }`}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Glyph name={lv.glyph} className="w-4 h-4" />
                  {lv.name}
                </span>
              </button>
            ))}
            <span className="flex-1 min-w-[20px]" aria-hidden />
          </div>

          {/* Lever title + screen */}
          <div className="px-6 lg:px-9 pt-6 pb-1">
            <h3 className="font-display font-bold text-heading text-fg">{lever.title}</h3>
          </div>
          <div className="p-3 sm:p-5 pt-3">
            <div className="bg-well border border-line rounded-inset overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lever.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <lever.Demo />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="px-6 lg:px-9 pb-7 font-mono text-tele text-mute leading-[1.8]">
            <span className="text-dim">{"// "}</span>
            {lever.note}
          </div>
        </div>

        {/* Deployment proof strip */}
        <div className="mt-8 border border-line rounded-inset bg-deck">
          <div className="px-5 py-2.5 border-b border-line font-mono text-tele-sm uppercase text-dim flex items-center gap-2.5">
            <span className="w-[7px] h-[7px] rounded-full bg-steel" aria-hidden />
            from a live deployment. our own stores, every day. not a promise of yours.
          </div>
          {/* The real screen: live capture, figures blurred */}
          <div className="border-b border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/taps-live.png"
              alt="Live screen from our purchasing engine deployment: brand weeks-of-supply across all stores, figures blurred"
              width={2268}
              height={1000}
              loading="lazy"
              className="w-full h-auto block"
            />
            <p className="px-5 py-2 font-mono text-tele-sm uppercase text-dim border-t border-line">
              live screen, this morning&apos;s sync · figures blurred
            </p>
          </div>
          <div className="px-5 py-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 font-mono">
            {proofStats.map((s) => (
              <span key={s.k} className="flex items-baseline gap-2.5 text-tele-sm uppercase">
                <span className="text-amber tabular text-tele font-medium">
                  <OdometerNumber value={s.v} startOnView />
                </span>
                <span className="text-dim">{s.k}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Handoff */}
        <p className="mt-6 px-1 font-mono text-tele">
          <a href="#how-it-works" className="text-steel hover:text-amber transition-colors">
            every engine starts the same way ↓
          </a>
        </p>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  dragFaults,
  evidencePriority,
  recoveryLine,
  summarize,
  altKindLabels,
  toParam,
  fmtK,
  type DragFault,
  type FaultId,
} from "@/data/dragCheck";
import { ReportDemo } from "@/components/demos/ReportDemo";
import { MarginDemo } from "@/components/demos/MarginDemo";
import { SupplyDemo } from "@/components/demos/SupplyDemo";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";
import { OdometerNumber } from "@/components/ui/OdometerNumber";

/** "reporting_engine" -> "reporting": glyph names match engine prefixes */
const glyphFor = (engine: string) => engine.replace(/_engine$/, "") as GlyphName;

/**
 * "The problem, priced": one interactive board. Nine rows, each a
 * symptom with a severity readout and a switch. The tactility budget of
 * the whole site is spent here: spring rockers, a single amber sweep on
 * flag, staggered severity fills, odometer totals.
 *
 * "Watch an engine run" follows in the same component so the result's
 * evidence link can select the matching live demo.
 */

const demoChannels = [
  { key: "report", name: "reporting_engine", Demo: ReportDemo },
  { key: "margin", name: "margin_engine", Demo: MarginDemo },
  { key: "inventory", name: "inventory_engine", Demo: SupplyDemo },
] as const;

type DemoKey = (typeof demoChannels)[number]["key"];

function Rocker({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-block w-10 h-[22px] rounded-full border transition-colors shrink-0 ${
        on ? "bg-amber/20 border-amber" : "bg-deck border-steel-deep"
      }`}
      aria-hidden
    >
      <motion.span
        className={`absolute top-[3px] left-[3px] w-[14px] h-[14px] rounded-full ${
          on ? "bg-amber" : "bg-steel"
        }`}
        initial={false}
        animate={{ x: on ? 18 : 0 }}
        transition={{ type: "spring", stiffness: 700, damping: 26, mass: 0.7 }}
      />
    </span>
  );
}

function SeverityBars({ sev, on }: { sev: number; on: boolean }) {
  return (
    <span
      className="hidden sm:flex gap-[3px] items-center"
      aria-label={`severity ${sev} of 5`}
    >
      {Array.from({ length: 5 }).map((_, s) => (
        <span
          key={s}
          className="relative w-[14px] h-[5px] rounded-[1px] overflow-hidden bg-line"
        >
          {s < sev && (
            <>
              <span className="absolute inset-0 bg-steel-deep" />
              <motion.span
                className="absolute inset-0 bg-amber origin-left"
                initial={false}
                animate={{ scaleX: on ? 1 : 0 }}
                transition={{
                  duration: 0.18,
                  delay: (on ? s : sev - 1 - s) * 0.02,
                  ease: "easeOut",
                }}
              />
            </>
          )}
        </span>
      ))}
    </span>
  );
}

function FaultRow({
  fault,
  on,
  onToggle,
}: {
  fault: DragFault;
  on: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const [sweep, setSweep] = useState(0);

  const handle = () => {
    if (!on && !reduced) setSweep((k) => k + 1); // fires once per flag, never repeats on its own
    onToggle();
  };

  return (
    <div
      className={`relative overflow-hidden border-b border-line transition-colors duration-300 ${
        on ? "bg-amber/[0.05]" : "hover:bg-panel/60"
      }`}
    >
      {sweep > 0 && (
        <motion.span
          key={sweep}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber/15 to-transparent"
          initial={{ left: "-35%" }}
          animate={{ left: "105%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-hidden
        />
      )}
      <button
        role="switch"
        aria-checked={on}
        aria-label={`${fault.switchLabel}: ${fault.symptom}`}
        onClick={handle}
        className="w-full text-left focus-visible:outline-offset-[-3px]"
      >
        <div className="max-w-container mx-auto px-6 lg:px-10 py-4 sm:py-5 grid grid-cols-[40px_1fr_auto] sm:grid-cols-[64px_36px_minmax(0,1fr)_auto_auto] items-center gap-x-4 gap-y-1">
          <span
            className={`font-mono text-tele tabular transition-colors ${on ? "text-amber" : "text-dim"}`}
          >
            {fault.id}
          </span>
          <span className={`hidden sm:block transition-colors ${on ? "text-amber" : "text-dim"}`}>
            <Glyph name={glyphFor(fault.engine)} className="w-6 h-6" />
          </span>
          <span className="min-w-0">
            <span
              className={`block font-display font-bold text-[clamp(1rem,1.8vw,1.3rem)] tracking-[-0.01em] transition-colors ${on ? "text-fg" : "text-mute"}`}
            >
              {fault.symptom}
            </span>
            <span
              className={`block font-mono text-tele-sm mt-0.5 transition-colors ${on ? "text-amber" : "text-dim"}`}
            >
              {fault.switchLabel}
            </span>
          </span>
          <SeverityBars sev={fault.sev} on={on} />
          <Rocker on={on} />
        </div>
      </button>
    </div>
  );
}

export function ProblemPriced() {
  const reduced = useReducedMotion();
  const [flagged, setFlagged] = useState<FaultId[]>([]);
  const [readMode, setReadMode] = useState(false);
  const [channel, setChannel] = useState<DemoKey>("report");
  const [pinned, setPinned] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const summary = useMemo(() => summarize(flagged), [flagged]);

  const toggle = (id: FaultId) =>
    setFlagged((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const evidenceFault = useMemo(() => {
    for (const id of evidencePriority) {
      if (!flagged.includes(id)) continue;
      const fault = dragFaults.find((f) => f.id === id);
      if (fault?.evidence) return fault;
    }
    return null;
  }, [flagged]);

  const altSuffix =
    summary.altKinds.length > 0
      ? `, plus ${summary.altKinds.map((k) => altKindLabels[k]).join(", ")}`
      : "";

  const contactHref =
    flagged.length > 0 ? `/contact?dc=${toParam(flagged)}` : "/contact";

  return (
    <>
      {/* THE PROBLEM, PRICED */}
      <section id="drag-check" className="bg-well border-y border-line scroll-mt-14">
        {/* Title plate */}
        <div className="border-b border-line">
          <div className="max-w-container mx-auto px-6 lg:px-10 py-10 md:py-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-tele-sm uppercase text-amber mb-4">
                The problem, priced
              </p>
              <h2 className="font-display text-section text-fg max-w-[22ch]">
                Your business carries fat you can&apos;t see.{" "}
                <span className="text-amber">Price yours.</span>
              </h2>
              <p className="mt-4 font-mono text-tele text-mute max-w-[58ch] leading-[1.8]">
                nine switches. sixty seconds. no email. flip every row that
                sounds like your week.
              </p>
            </div>
            <p className="font-mono text-tele-sm uppercase text-dim pb-1">
              typical figures, from real builds
            </p>
          </div>
        </div>

        {/* The board: nine switchable rows, edge to edge */}
        <div>
          {dragFaults.map((fault) => (
            <FaultRow
              key={fault.id}
              fault={fault}
              on={flagged.includes(fault.id)}
              onToggle={() => toggle(fault.id)}
            />
          ))}
        </div>

        {/* Live readout + read result */}
        <div className="border-b border-line">
          <div className="max-w-container mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-tele">
            <span className="text-mute">
              faults flagged:{" "}
              <span className={`tabular ${flagged.length ? "text-amber" : "text-mute"}`}>
                {String(flagged.length).padStart(2, "0")}
              </span>
            </span>
            {summary.hours[1] > 0 && (
              <span className="text-mute inline-flex items-baseline gap-1.5 flex-wrap">
                est. drag:{" "}
                <OdometerNumber
                  value={`${summary.hours[0]}–${summary.hours[1]}`}
                  className="text-amber"
                />{" "}
                hrs/wk ≈{" "}
                <OdometerNumber
                  value={`${fmtK(summary.dollars[0])}–${fmtK(summary.dollars[1])}`}
                  className="text-amber"
                />
                /yr
                {altSuffix && <span className="text-mute">{altSuffix}</span>}
              </span>
            )}
            <button
              onClick={() => setReadMode(true)}
              className={`ml-auto px-5 py-2.5 bg-amber text-deck rounded-hard font-medium font-body hover:bg-amber-bright transition-all ${
                flagged.length ? "shadow-glow" : ""
              }`}
            >
              read result
            </button>
          </div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {readMode && (
            <motion.div
              initial={reduced ? false : { opacity: 0.9 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-b border-line bg-deck"
            >
              <div className="max-w-container mx-auto px-6 lg:px-10 py-7 font-mono text-tele leading-[1.9]">
                {summary.flagged.length === 0 ? (
                  <>
                    <p className="text-ok">✓ clean panel.</p>
                    <p className="text-mute mt-2 max-w-[64ch]">
                      either your operation is lean, or the fat is hiding where
                      switches don&apos;t reach. 30 minutes finds out.
                    </p>
                  </>
                ) : (
                  <>
                    {summary.flagged.map((f) => (
                      <div key={f.id} className="py-2.5 border-b border-line/60 last:border-b-0">
                        <p>
                          <span className="text-dim">{f.id}</span>{" "}
                          <span className="text-fg">{f.switchLabel}</span>{" "}
                          <span className="text-dim">→</span>{" "}
                          <span className="text-amber">{f.engine}</span>
                          <span className="text-mute">: {f.prescription}</span>
                        </p>
                        <p className="text-mute mt-1 pl-0 sm:pl-14">
                          typical recovery:{" "}
                          <span className="text-amber-bright tabular">{recoveryLine(f)}</span>
                        </p>
                      </div>
                    ))}

                    <p className="mt-5 text-fg">
                      <span className="text-dim">∑ </span>estimated drag:{" "}
                      <span className="inline-flex items-baseline gap-1.5 flex-wrap">
                        <OdometerNumber
                          value={`${summary.hours[0]}–${summary.hours[1]}`}
                          className="text-amber"
                        />{" "}
                        <span className="text-amber">hrs/week ≈</span>{" "}
                        <OdometerNumber
                          value={`${fmtK(summary.dollars[0])}–${fmtK(summary.dollars[1])}`}
                          className="text-amber"
                        />{" "}
                        <span className="text-amber">per year</span>
                      </span>
                      {altSuffix && <span className="text-mute">{altSuffix}</span>}
                    </p>

                    {evidenceFault && (
                      <p className="mt-3">
                        <span className="text-mute">see {evidenceFault.engine} running:</span>{" "}
                        {evidenceFault.evidence === "purchasing" ? (
                          <a href="#purchasing" className="text-amber hover:text-amber-bright transition-colors">
                            watch it work →
                          </a>
                        ) : (
                          <a
                            href="#demos"
                            onClick={() => {
                              setChannel(evidenceFault.evidence as DemoKey);
                              setPinned(true);
                            }}
                            className="text-amber hover:text-amber-bright transition-colors"
                          >
                            watch it work →
                          </a>
                        )}
                      </p>
                    )}
                  </>
                )}

                <p className="mt-5 text-tele-sm uppercase text-dim">
                  dollars at $35/hr loaded cost. typical ranges from real
                  builds, not a quote.
                </p>

                <span className="inline-flex flex-wrap items-center gap-6 mt-6">
                  <Link
                    href={contactHref}
                    data-tracking="drag-check-cta"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-amber text-deck rounded-hard font-medium font-body hover:bg-amber-bright transition-colors"
                  >
                    Book the demo. Bring this profile. →
                  </Link>
                  {summary.flagged.length > 0 && (
                    <button
                      onClick={() => window.print()}
                      className="font-mono text-tele text-steel hover:text-amber transition-colors"
                    >
                      print this profile
                    </button>
                  )}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Handoff */}
        <div className="max-w-container mx-auto px-6 lg:px-10 py-5 font-mono text-tele">
          <a href="#demos" className="text-steel hover:text-amber transition-colors">
            flagged something? watch the engine that clears it ↓
          </a>
        </div>
      </section>

      {/* Paper artifact: branded letterhead, exists only in print */}
      {mounted &&
        readMode &&
        summary.flagged.length > 0 &&
        createPortal(
          <div className="print-sheet font-mono" aria-hidden>
            {/* Letterhead */}
            <div className="flex items-baseline justify-between pb-3 border-b-2 sheet-rule" style={{ borderBottomWidth: 2 }}>
              <span style={{ fontSize: "14pt" }}>
                <span className="sheet-amber">●</span> run{" "}
                <span className="sheet-amber">process</span>_supreme
              </span>
              <span className="sheet-dim" style={{ letterSpacing: "0.1em" }}>
                DRAG CHECK PROFILE
              </span>
            </div>
            <p className="sheet-dim" style={{ margin: "8pt 0 16pt", fontSize: "9pt" }}>
              printed{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · flagged by the operator at process-supreme.vercel.app
            </p>

            {/* Flagged faults */}
            {summary.flagged.map((f) => (
              <div
                key={f.id}
                className="sheet-rule"
                style={{ borderBottom: "1px solid", padding: "8pt 0", breakInside: "avoid" }}
              >
                <p style={{ fontWeight: 700 }}>
                  <span className="sheet-dim">{f.id}</span> {f.switchLabel}{" "}
                  <span className="sheet-dim">→</span> {f.engine}
                </p>
                <p style={{ margin: "2pt 0 0" }}>{f.prescription}</p>
                <p style={{ margin: "2pt 0 0" }}>
                  <span className="sheet-dim">typical recovery: </span>
                  <span className="sheet-amber" style={{ fontWeight: 700 }}>
                    {recoveryLine(f)}
                  </span>
                </p>
              </div>
            ))}

            {/* Totals */}
            <p style={{ margin: "14pt 0 0", fontSize: "13pt", fontWeight: 700 }}>
              ∑ estimated drag:{" "}
              <span className="sheet-amber">
                {summary.hours[0]}–{summary.hours[1]} hrs/week ≈ {fmtK(summary.dollars[0])}–
                {fmtK(summary.dollars[1])} per year
              </span>
              {altSuffix}
            </p>
            <p className="sheet-dim" style={{ margin: "10pt 0 0", fontSize: "9pt", letterSpacing: "0.08em" }}>
              DOLLARS AT $35/HR LOADED COST. TYPICAL RANGES FROM REAL BUILDS, NOT A QUOTE.
            </p>

            {/* Footer */}
            <div
              className="sheet-rule"
              style={{ borderTop: "1px solid", marginTop: "16pt", paddingTop: "8pt", display: "flex", justifyContent: "space-between", fontSize: "9pt" }}
            >
              <span>
                book the demo:{" "}
                <span style={{ fontWeight: 700 }}>process-supreme.vercel.app/contact</span>
              </span>
              <span className="sheet-amber">PS, we love you</span>
            </div>
          </div>,
          document.body
        )}

      {/* WATCH AN ENGINE RUN */}
      <section id="demos" className="relative py-band bg-deck scroll-mt-14">
        <div className="absolute inset-0 aurora" aria-hidden />
        <div className="relative max-w-container mx-auto px-3 sm:px-6 lg:px-10">
          <div className="px-3 sm:px-0 mb-8">
            <p className="font-mono text-tele-sm uppercase text-amber mb-3">
              Watch an engine run
            </p>
            <h2 className="font-display font-bold text-heading text-fg max-w-[30ch]">
              Three engines, live on screen. This is the actual product, with
              example numbers.
            </h2>
          </div>

          <div className="glass rounded-panel overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line font-mono text-tele-sm uppercase">
              <span className="flex items-center gap-2.5 text-mute">
                <span className="w-[7px] h-[7px] rounded-full bg-amber" aria-hidden />
                live demos
              </span>
              <span className="text-dim">example data</span>
            </div>
            <DemoTabs
              channel={channel}
              pinned={pinned}
              onSelect={(k) => {
                setChannel(k);
                setPinned(true);
              }}
            />
          </div>

          {/* Handoff */}
          <p className="mt-5 px-1 font-mono text-tele">
            <a href="#purchasing" className="text-steel hover:text-amber transition-colors">
              that is one engine. here is how deep they go ↓
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

function DemoTabs({
  channel,
  pinned,
  onSelect,
}: {
  channel: DemoKey;
  pinned: boolean;
  onSelect: (key: DemoKey) => void;
}) {
  const reduced = useReducedMotion();
  const [autoIndex, setAutoIndex] = useState(0);

  const activeKey = pinned ? channel : demoChannels[autoIndex].key;
  const active = demoChannels.find((c) => c.key === activeKey)!;

  useEffect(() => {
    if (reduced || pinned) return;
    const t = setInterval(
      () => setAutoIndex((i) => (i + 1) % demoChannels.length),
      11000
    );
    return () => clearInterval(t);
  }, [reduced, pinned]);

  return (
    <>
      <div className="flex border-b border-line font-mono text-tele overflow-x-auto" role="tablist" aria-label="Live engine demos">
        {demoChannels.map((ch) => (
          <button
            key={ch.key}
            role="tab"
            aria-selected={activeKey === ch.key}
            onClick={() => onSelect(ch.key)}
            className={`flex items-center gap-2.5 px-5 py-3.5 border-r border-line whitespace-nowrap transition-colors ${
              activeKey === ch.key
                ? "bg-well text-amber"
                : "text-mute hover:text-fg hover:bg-panel-up"
            }`}
          >
            <Glyph name={glyphFor(ch.name)} className="w-4 h-4" />
            {ch.name}
          </button>
        ))}
        <span className="flex-1 min-w-[20px]" aria-hidden />
      </div>
      <div className="p-3 sm:p-5">
        <div className="bg-well border border-line rounded-inset overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <active.Demo />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

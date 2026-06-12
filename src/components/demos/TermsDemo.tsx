"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * purchasing_intelligence / lever 3: payment terms backed by your own
 * shelf data. Days-on-shelf versus current terms shows who you are
 * financing, and by how much. Example data, clearly illustrative.
 */

const rows = [
  { name: "supplier_a", shelf: "53d", terms: "net_30", suggested: "net_60", financing: "23d financed" },
  { name: "supplier_b", shelf: "21d", terms: "net_30", suggested: "net_30", financing: "fair" },
  { name: "supplier_c", shelf: "44d", terms: "net_15", suggested: "net_45", financing: "29d financed" },
  { name: "supplier_d", shelf: "67d", terms: "COD", suggested: "net_60", financing: "67d financed" },
];

const TOTAL_STEPS = rows.length + 2; // header + rows + float total

export function TermsDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 700);

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: suggested payment terms computed from days on shelf, with total float exposure"
    >
      <motion.div
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-[100px_72px_76px_84px_1fr] gap-3 pb-3 text-tele-sm uppercase text-steel/80"
      >
        <span>supplier</span>
        <span className="text-right">on_shelf</span>
        <span className="text-right">paying</span>
        <span className="text-right">suggest</span>
        <span className="text-right">exposure</span>
      </motion.div>

      {rows.map((row, i) => {
        const visible = step >= i + 2;
        const unfair = row.financing !== "fair";
        return (
          <motion.div
            key={row.name}
            animate={{ opacity: visible ? 1 : 0.55 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[100px_72px_76px_84px_1fr] gap-3 py-1.5"
          >
            <span className="text-mute">{row.name}</span>
            <span className="text-right text-fg">{row.shelf}</span>
            <span className="text-right text-fg">{row.terms}</span>
            <span className={`text-right ${unfair ? "text-amber" : "text-mute"}`}>
              {row.suggested}
            </span>
            <span className={`text-right ${unfair ? "text-amber-bright" : "text-mute"}`}>
              {row.financing}
            </span>
          </motion.div>
        );
      })}

      <motion.div
        animate={{ opacity: step >= TOTAL_STEPS ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        className="mt-4 border border-amber-deep/60 bg-amber/[0.06] rounded-inset px-4 py-3"
      >
        <p className="text-amber">
          → you pay before it sells on 3 of 4 suppliers. monthly float
          exposure: $41,300
        </p>
        <p className="text-mute mt-1">renegotiation list drafted. bring it to the next call.</p>
      </motion.div>
    </div>
  );
}

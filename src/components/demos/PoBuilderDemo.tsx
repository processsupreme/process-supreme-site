"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * purchasing_intelligence / lever 1: orders sized by sell-through.
 * The PO builder computes each suggested order with visible math.
 * Example data, clearly illustrative.
 */

const rows = [
  { sku: "sku_0214", velocity: "18/wk", onHand: 22, suggested: "4 cs", note: "case of 12" },
  { sku: "sku_1042", velocity: "9/wk", onHand: 6, suggested: "3 cs", note: "lead 14d" },
  { sku: "sku_0588", velocity: "31/wk", onHand: 40, suggested: "6 cs", note: "MOQ 24 met" },
  { sku: "sku_2204", velocity: "5/wk", onHand: 3, suggested: "2 cs", note: "store b +1" },
];

const TOTAL_STEPS = rows.length + 3; // formula + rows + build stamp + create PO

export function PoBuilderDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 700);

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: purchase orders computed from sell-through with visible math"
    >
      <motion.p
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="text-mute pb-3 border-b border-line/60"
      >
        suggested <span className="text-amber">=</span> velocity × wos_target{" "}
        <span className="text-amber">+</span> lead_cover{" "}
        <span className="text-amber">−</span> on_hand{" "}
        <span className="text-mute">→ rounded to cases</span>
      </motion.p>

      <div className="grid grid-cols-[92px_1fr_72px_70px_1fr] gap-3 pt-3 pb-2 text-tele-sm uppercase text-steel/80">
        <span>sku</span>
        <span>velocity</span>
        <span className="text-right">on_hand</span>
        <span className="text-right">order</span>
        <span className="text-right">check</span>
      </div>

      {rows.map((row, i) => {
        const visible = step >= i + 2;
        return (
          <motion.div
            key={row.sku}
            animate={{ opacity: visible ? 1 : 0.55 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[92px_1fr_72px_70px_1fr] gap-3 py-1.5"
          >
            <span className="text-mute">{row.sku}</span>
            <span className="text-fg">{row.velocity}</span>
            <span className="text-right text-fg">{row.onHand}</span>
            <span className="text-right text-amber">{row.suggested}</span>
            <span className="text-right text-mute">{row.note}</span>
          </motion.div>
        );
      })}

      <motion.p
        animate={{
          opacity: step >= TOTAL_STEPS - 1 ? 1 : 0.55
        }}
        transition={{ duration: 0.35 }}
        className="mt-4 text-mute"
      >
        <span className="text-amber">$</span> create PO
      </motion.p>
      <motion.p
        animate={{
          opacity: step >= TOTAL_STEPS ? 1 : 0.55
        }}
        transition={{ duration: 0.35 }}
        className="mt-1 text-ok"
      >
        ✓ 7 formatted order sheets written, one per location. hours of buyer
        work, one click.
      </motion.p>
    </div>
  );
}

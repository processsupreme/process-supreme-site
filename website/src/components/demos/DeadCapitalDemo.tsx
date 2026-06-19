"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * purchasing_intelligence / lever 5: dead capital, named and priced.
 * Idle products listed with trapped dollars and a recommended action.
 * Example data, clearly illustrative.
 */

const rows = [
  { name: "sku_0331", idle: "11 wks", trapped: "$4,820", action: "liquidate" },
  { name: "sku_1877", idle: "9 wks", trapped: "$3,140", action: "transfer → store b" },
  { name: "sku_0945", idle: "14 wks", trapped: "$2,890", action: "discount 20%" },
  { name: "sku_2410", idle: "8 wks", trapped: "$2,090", action: "transfer → store d" },
];

const TOTAL_STEPS = rows.length + 2; // header + rows + totals

export function DeadCapitalDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 700);

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: dead inventory listed with trapped dollars and recommended actions"
    >
      <motion.div
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-[92px_72px_84px_1fr] gap-3 pb-3 text-tele-sm uppercase text-steel/80"
      >
        <span>product</span>
        <span className="text-right">idle</span>
        <span className="text-right">trapped</span>
        <span className="text-right">action</span>
      </motion.div>

      {rows.map((row, i) => {
        const visible = step >= i + 2;
        return (
          <motion.div
            key={row.name}
            animate={{ opacity: visible ? 1 : 0.55 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[92px_72px_84px_1fr] gap-3 py-1.5"
          >
            <span className="text-mute">{row.name}</span>
            <span className="text-right text-fg">{row.idle}</span>
            <span className="text-right text-alert">{row.trapped}</span>
            <span className="text-right text-amber">{row.action}</span>
          </motion.div>
        );
      })}

      <motion.div
        animate={{ opacity: step >= TOTAL_STEPS ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        className="mt-4 border border-amber-deep/60 bg-amber/[0.06] rounded-inset px-4 py-3"
      >
        <p className="text-amber">→ $12,940 sitting still. action list drafted, owner assigned.</p>
        <p className="text-mute mt-1">dead stock either moves, or it stops being reordered.</p>
      </motion.div>
    </div>
  );
}

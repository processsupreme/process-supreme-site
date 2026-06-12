"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * inventory_engine screen: weeks-of-supply levels read in like fuel
 * gauges, one runs thin, a reorder is drafted before the stockout.
 * Chrome-less: docks into the engines console. Example data.
 */

const items = [
  { name: "sku_1042", weeks: 6.5, max: 8 },
  { name: "sku_0871", weeks: 4.2, max: 8 },
  { name: "sku_2204", weeks: 1.1, max: 8, low: true },
  { name: "sku_1388", weeks: 5.8, max: 8 },
];

const TOTAL_STEPS = items.length + 3; // header + bars + low flag + PO line

export function SupplyDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 700);

  const lowStep = items.length + 2;
  const poStep = items.length + 3;

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: weeks-of-supply levels with a reorder drafted before a stockout"
    >
      <motion.div
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-[110px_1fr_96px] gap-4 pb-3 text-tele-sm uppercase text-steel/80"
      >
        <span>sku</span>
        <span>weeks of supply</span>
        <span className="text-right">level</span>
      </motion.div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const visible = step >= i + 2;
          const isLow = item.low && step >= lowStep;
          return (
            <motion.div
              key={item.name}
              animate={{ opacity: visible ? 1 : 0.55 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-[110px_1fr_96px] gap-4 items-center"
            >
              <span className={isLow ? "text-alert" : "text-mute"}>{item.name}</span>
              <span className="flex gap-[3px]" aria-hidden>
                {Array.from({ length: 16 }).map((_, s) => {
                  const lit = s < Math.round((item.weeks / item.max) * 16);
                  return (
                    <span
                      key={s}
                      className={`h-[12px] w-[5px] rounded-[1px] transition-colors duration-300 ${
                        lit ? (isLow ? "bg-alert" : "bg-amber") : "bg-line"
                      }`}
                      style={{ transitionDelay: visible ? `${s * 20}ms` : "0ms" }}
                    />
                  );
                })}
              </span>
              <span className={`text-right ${isLow ? "text-alert" : "text-fg"}`}>
                {item.weeks.toFixed(1)} wks{isLow ? " ⚠" : ""}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{
          opacity: step >= poStep ? 1 : 0.55
        }}
        transition={{ duration: 0.35 }}
        className="mt-5 border border-amber-deep/60 bg-amber/[0.06] rounded-inset px-4 py-3 text-amber"
      >
        → sku_2204 runs dry in 8 days. reorder drafted, lead time covered
      </motion.div>
    </div>
  );
}

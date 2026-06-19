"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * margin_engine screen: vendor margins read in as instrument bars, one
 * high-volume line flags low, the engine names the fix. Chrome-less:
 * docks into the engines console. Example data, clearly illustrative.
 */

const rows = [
  { name: "vendor_a", volume: "high", margin: 41, flagged: false },
  { name: "vendor_b", volume: "high", margin: 38, flagged: false },
  { name: "vendor_c", volume: "very high", margin: 12, flagged: true },
  { name: "vendor_d", volume: "medium", margin: 44, flagged: false },
];

const TOTAL_STEPS = rows.length + 3; // header + rows + flag + action

export function MarginDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 700);

  const flagStep = rows.length + 2;
  const actionStep = rows.length + 3;

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: a margin readout flags a high-volume, low-margin vendor"
    >
      <motion.div
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-[110px_1fr_88px] gap-4 pb-3 text-tele-sm uppercase text-steel/80"
      >
        <span>line</span>
        <span>margin</span>
        <span className="text-right">vol / pct</span>
      </motion.div>

      <div className="space-y-3">
        {rows.map((row, i) => {
          const visible = step >= i + 2;
          const isFlagged = row.flagged && step >= flagStep;
          return (
            <motion.div
              key={row.name}
              animate={{ opacity: visible ? 1 : 0.55 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-[110px_1fr_88px] gap-4 items-center"
            >
              <span className={isFlagged ? "text-alert" : "text-mute"}>{row.name}</span>
              <span className="h-[6px] bg-line/70 rounded-hard overflow-hidden">
                <motion.span
                  className={`block h-full ${isFlagged ? "bg-alert" : "bg-amber"}`}
                  animate={{ width: `${(row.margin / 50) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className={`text-right ${isFlagged ? "text-alert" : "text-fg"}`}>
                {row.volume} / {row.margin}%{isFlagged ? " ⚠" : ""}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{
          opacity: step >= actionStep ? 1 : 0.55
        }}
        transition={{ duration: 0.35 }}
        className="mt-5 border border-amber-deep/60 bg-amber/[0.06] rounded-inset px-4 py-3 text-amber"
      >
        → high volume, lowest margin in the room. renegotiate or replace:
        est. $18K/yr recovered
      </motion.div>
    </div>
  );
}

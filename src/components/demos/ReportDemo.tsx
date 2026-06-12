"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * reporting_engine screen: a daily operations report assembles itself,
 * then stamps its delivery time. Chrome-less: docks into the engines
 * console. Example data, clearly illustrative.
 */

const reportLines: { label: string; value: string; tone?: "warn" | "success" }[] = [
  { label: "net_sales", value: "$47,832" },
  { label: "orders", value: "412 (avg $116)" },
  { label: "margin", value: "38.2%" },
  { label: "vs_last_week", value: "+12.4%" },
  { label: "top_location", value: "Henderson" },
  { label: "flag", value: "PM shift understaffed", tone: "warn" },
];

const TOTAL_STEPS = reportLines.length + 2; // build line + rows + stamp

export function ReportDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 650);

  return (
    <div
      ref={ref}
      className="font-mono text-tele leading-[1.9] min-h-[300px] p-6 tabular"
      aria-label="Animated example: a daily report builds itself and is delivered at 6:30 AM"
    >
      <motion.div
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="text-mute"
      >
        <span className="text-amber">$ </span>build report --daily
        {step < TOTAL_STEPS && step >= 1 && <span> ...</span>}
      </motion.div>

      {reportLines.map((line, i) => (
        <motion.div
          key={line.label}
          animate={{
            opacity: step >= i + 2 ? 1 : 0.55
          }}
          transition={{ duration: 0.3 }}
          className="flex gap-3 border-b border-dashed border-line/60 last:border-0"
        >
          <span className="text-amber w-44 shrink-0">{line.label}</span>
          <span className={line.tone === "warn" ? "text-amber-bright" : "text-fg"}>
            {line.value}
          </span>
        </motion.div>
      ))}

      <motion.div
        animate={{
          opacity: step >= TOTAL_STEPS ? 1 : 0.55
        }}
        transition={{ duration: 0.35 }}
        className="mt-4 text-ok"
      >
        ✓ delivered 6:30 AM, before anyone walks in
      </motion.div>
    </div>
  );
}

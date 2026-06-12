"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * purchasing_intelligence / lever 4: suppliers graded by what they earn
 * you. Revenue, profit, margin, momentum, minus aging and excess, graded
 * S through D. Example data, clearly illustrative.
 */

const rows = [
  { name: "brand_k", grade: "S", score: 94, verdict: "earns its shelf" },
  { name: "brand_m", grade: "A", score: 86, verdict: "earns its shelf" },
  { name: "brand_t", grade: "B", score: 71, verdict: "watch momentum" },
  { name: "brand_q", grade: "D", score: 38, verdict: "renting it from you" },
];

const gradeColor: Record<string, string> = {
  S: "text-ok border-ok/50",
  A: "text-amber border-amber/50",
  B: "text-amber-bright border-amber-deep/60",
  D: "text-alert border-alert/50",
};

const TOTAL_STEPS = rows.length + 2; // header + rows + report line

export function RankingsDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 700);

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: brands graded S through D by revenue, profit, margin, and momentum"
    >
      <motion.div
        animate={{ opacity: step >= 1 ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-[92px_44px_1fr_1fr] gap-3 pb-3 text-tele-sm uppercase text-steel/80"
      >
        <span>brand</span>
        <span>grade</span>
        <span>score: rev · profit · momentum − aging</span>
        <span className="text-right">verdict</span>
      </motion.div>

      {rows.map((row, i) => {
        const visible = step >= i + 2;
        return (
          <motion.div
            key={row.name}
            animate={{ opacity: visible ? 1 : 0.55 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[92px_44px_1fr_1fr] gap-3 py-2 items-center"
          >
            <span className="text-mute">{row.name}</span>
            <span
              className={`inline-flex items-center justify-center w-7 h-7 border rounded-hard font-medium ${gradeColor[row.grade]}`}
            >
              {row.grade}
            </span>
            <span className="h-[6px] bg-line/70 rounded-hard overflow-hidden">
              <motion.span
                className={`block h-full ${row.grade === "D" ? "bg-alert" : "bg-amber"}`}
                animate={{ width: `${row.score}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <span className={`text-right ${row.grade === "D" ? "text-alert" : "text-mute"}`}>
              {row.verdict}
            </span>
          </motion.div>
        );
      })}

      <motion.p
        animate={{ opacity: step >= TOTAL_STEPS ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        className="mt-4 text-ok"
      >
        ✓ supplier report drafted: clean enough to send to brand_q&apos;s rep
      </motion.p>
    </div>
  );
}

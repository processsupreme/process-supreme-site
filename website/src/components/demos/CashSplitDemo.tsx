"use client";

import { motion } from "framer-motion";
import { useDemoLoop } from "./useDemoLoop";

/**
 * purchasing_intelligence / lever 2: cash flow control inside the buy.
 * Orders split urgent vs deferred so one glance decides what this week's
 * cash has to cover. Example data, clearly illustrative.
 */

const urgent = [
  { name: "supplier_a", amount: "$6,840", why: "stockout ≤ 7d" },
  { name: "supplier_d", amount: "$4,210", why: "stockout ≤ 5d" },
  { name: "supplier_f", amount: "$3,160", why: "lead time 21d" },
];

const deferred = [
  { name: "supplier_b", amount: "$5,330", why: "covered 19d" },
  { name: "supplier_c", amount: "$4,150", why: "covered 24d" },
];

const TOTAL_STEPS = 6; // headers, urgent rows, deferred rows, totals, verdict

export function CashSplitDemo() {
  const { ref, step } = useDemoLoop(TOTAL_STEPS, 750);

  return (
    <div
      ref={ref}
      className="font-mono text-tele min-h-[300px] p-6 tabular"
      aria-label="Animated example: orders split into order-today versus can-wait with dollar totals"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Urgent column */}
        <div>
          <motion.p
            animate={{ opacity: step >= 1 ? 1 : 0.55 }}
            className="text-tele-sm uppercase text-amber pb-2 border-b border-line/60"
          >
            order_today
          </motion.p>
          {urgent.map((row, i) => (
            <motion.div
              key={row.name}
              animate={{ opacity: step >= 2 ? 1 : 0.55 }}
              transition={{ duration: 0.3, delay: i * 0.12 }}
              className="flex justify-between gap-3 py-1.5"
            >
              <span className="text-mute">{row.name}</span>
              <span className="text-mute text-tele-sm">{row.why}</span>
              <span className="text-fg">{row.amount}</span>
            </motion.div>
          ))}
          <motion.p
            animate={{ opacity: step >= 4 ? 1 : 0.55 }}
            className="mt-2 pt-2 border-t border-line/60 flex justify-between"
          >
            <span className="text-dim">subtotal</span>
            <span className="text-amber">$14,210</span>
          </motion.p>
        </div>

        {/* Deferred column */}
        <div>
          <motion.p
            animate={{ opacity: step >= 1 ? 1 : 0.55 }}
            className="text-tele-sm uppercase text-steel/80 pb-2 border-b border-line/60"
          >
            can_wait
          </motion.p>
          {deferred.map((row, i) => (
            <motion.div
              key={row.name}
              animate={{ opacity: step >= 3 ? 1 : 0.55 }}
              transition={{ duration: 0.3, delay: i * 0.12 }}
              className="flex justify-between gap-3 py-1.5"
            >
              <span className="text-mute">{row.name}</span>
              <span className="text-mute text-tele-sm">{row.why}</span>
              <span className="text-fg">{row.amount}</span>
            </motion.div>
          ))}
          <motion.p
            animate={{ opacity: step >= 4 ? 1 : 0.55 }}
            className="mt-2 pt-2 border-t border-line/60 flex justify-between"
          >
            <span className="text-dim">subtotal</span>
            <span className="text-mute">$9,480</span>
          </motion.p>
        </div>
      </div>

      <motion.p
        animate={{ opacity: step >= TOTAL_STEPS ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        className="mt-5 text-ok"
      >
        ✓ this week&apos;s cash covers $14,210, not $23,690. nothing stocks out.
      </motion.p>
    </div>
  );
}

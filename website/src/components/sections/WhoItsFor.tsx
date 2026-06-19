"use client";

import { motion } from "framer-motion";

/**
 * Is this you: a short checklist on a rail. Ticks render at full
 * contrast; motion is a slide, never a fade below 90%.
 */

const checks = [
  "regulated industry, paperwork that never stops",
  "multi-location, outgrew the spreadsheets years ago",
  "small-to-midmarket team doing enterprise process by hand",
  "your week disappears into numbers you only half believe",
];

export function WhoItsFor() {
  return (
    <section id="is-this-you" className="py-band scroll-mt-14">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="max-w-[34rem] border-l-2 border-amber-deep pl-7 sm:pl-10">
          <p className="font-mono text-tele-sm uppercase text-amber mb-2">
            Is this you?
          </p>
          <h2 className="font-display font-bold text-heading text-fg mb-7">
            Operators buried in process.
          </h2>
          <ul className="space-y-4 font-mono text-tele leading-relaxed">
            {checks.map((item, i) => (
              <motion.li
                key={item}
                initial={{ x: 10 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.3, delay: i * 0.12 }}
                className="flex gap-3.5 items-start"
              >
                <span className="shrink-0 text-amber" aria-hidden>
                  [✓]
                </span>
                <span className="text-mute">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Handoff */}
          <p className="mt-8 font-mono text-tele">
            <a href="#cta" className="text-steel hover:text-amber transition-colors">
              sounds familiar? one step left ↓
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

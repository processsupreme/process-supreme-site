"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Rolling odometer numerals: each digit rolls into place, everything
 * else (arrows, commas, units) stays put. Tabular by design so nothing
 * shifts. Convention: numbers that move are numbers that matter — use
 * this only where a figure carries the story.
 *
 * - live values (default): digits roll whenever `value` changes
 * - startOnView: digits roll from 0 once, the first time it scrolls in
 * - reduced motion: rendered settled, no roll
 */

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Digit({ d, animate }: { d: number; animate: boolean }) {
  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ height: "1.15em" }}
    >
      <motion.span
        className="flex flex-col"
        initial={false}
        animate={{ y: `${-d * 1.15}em` }}
        transition={
          animate
            ? { type: "spring", stiffness: 190, damping: 26, mass: 0.9 }
            : { duration: 0 }
        }
      >
        {DIGITS.map((n) => (
          <span key={n} style={{ height: "1.15em", lineHeight: "1.15em" }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

interface OdometerNumberProps {
  value: string;
  /** roll from zero once on first entry into view */
  startOnView?: boolean;
  className?: string;
}

export function OdometerNumber({
  value,
  startOnView = false,
  className,
}: OdometerNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion() ?? false;

  const settled = reduced || !startOnView || inView;

  return (
    <span
      ref={ref}
      className={`tabular inline-flex items-baseline ${className ?? ""}`}
      aria-label={value}
      role="img"
    >
      <span aria-hidden className="inline-flex">
        {value.split("").map((ch, i) =>
          /\d/.test(ch) ? (
            <Digit key={i} d={settled ? Number(ch) : 0} animate={!reduced} />
          ) : (
            <span
              key={i}
              className="inline-block"
              style={{ lineHeight: "1.15em", whiteSpace: "pre" }}
            >
              {ch}
            </span>
          )
        )}
      </span>
    </span>
  );
}

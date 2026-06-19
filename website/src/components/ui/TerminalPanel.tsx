"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Data-driven readout panel in the Flight Deck language: graphite
 * instrument chrome, phosphor-amber data, mono telemetry.
 *
 * Content is always passed in; nothing is hardcoded here. Lines reveal on
 * a per-line delay (seconds); under prefers-reduced-motion everything is
 * settled immediately.
 */

export type TerminalRole =
  | "prompt" // the $ sigil
  | "command" // typed command text
  | "key" // metric / engine name
  | "value" // metric value
  | "muted" // dim narration, arrows, punctuation
  | "success" // settled outcome lines
  | "warn"; // flagged values

export interface TerminalSegment {
  text: string;
  role: TerminalRole;
}

export interface TerminalLine {
  segments: TerminalSegment[];
  /** Seconds before this line appears. */
  delay?: number;
  /** Adds breathing room above the line. */
  spaceBefore?: boolean;
}

interface TerminalPanelProps {
  /** Label in the panel chrome, e.g. "process_supreme". */
  title?: string;
  lines: TerminalLine[];
  /** Show a blinking cursor once all lines are revealed. */
  cursor?: boolean;
  /** Right-hand chrome tag. Defaults to "example data". */
  tag?: string;
  className?: string;
}

const roleClasses: Record<TerminalRole, string> = {
  prompt: "text-amber",
  command: "text-fg",
  key: "text-amber",
  value: "text-fg/90",
  muted: "text-dim",
  success: "text-ok",
  warn: "text-amber-bright",
};

export function TerminalPanel({
  title,
  lines,
  cursor = true,
  tag = "example data",
  className,
}: TerminalPanelProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisibleCount(lines.length);
      return;
    }

    const timers = lines.map((line, index) =>
      setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, index + 1));
      }, (line.delay ?? index * 0.4) * 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [lines]);

  const allVisible = visibleCount >= lines.length;

  return (
    <div
      className={cn(
        "glass rounded-panel overflow-hidden font-mono text-tele",
        className
      )}
    >
      {/* Instrument chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-line">
        <div className="flex items-center gap-2.5">
          <span className="w-[7px] h-[7px] rounded-full bg-amber" aria-hidden />
          {title && <span className="text-tele-sm uppercase text-dim">{title}</span>}
        </div>
        <span className="text-tele-sm uppercase text-dim">{tag}</span>
      </div>

      {/* Readout lines */}
      <div className="p-5 leading-[1.9]">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index < visibleCount ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex flex-wrap", line.spaceBefore && "mt-2")}
          >
            {line.segments.map((segment, segmentIndex) => (
              <span
                key={segmentIndex}
                className={cn("whitespace-pre", roleClasses[segment.role])}
              >
                {segment.text}
              </span>
            ))}
          </motion.div>
        ))}

        {cursor && allVisible && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="inline-block w-2 h-4 bg-amber ml-1 align-text-bottom"
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Drives a looping, step-based demo animation under the never-empty-panel
 * rule: first paint is the COMPLETED state, and a replay never clears the
 * screen. Lines past the current step dim to ~55% and re-brighten as the
 * pass types over them; the completed state holds for `holdMs` between
 * passes. Under prefers-reduced-motion the demo stays settled at full.
 *
 * The loop only runs while the element is in view.
 */
export function useDemoLoop(
  totalSteps: number,
  stepMs: number,
  holdMs: number = 3600
) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  // Never empty: the demo is born finished.
  const [step, setStep] = useState(totalSteps);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setStep(totalSteps);
      return;
    }

    if (!inView) return;

    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      setStep((prev) => {
        const next = prev >= totalSteps ? 0 : prev + 1;
        // Hold the full state; move briskly through the replay.
        timer = setTimeout(advance, next >= totalSteps ? holdMs : stepMs);
        return next;
      });
    };
    timer = setTimeout(advance, holdMs);
    return () => clearTimeout(timer);
  }, [inView, totalSteps, stepMs, holdMs]);

  return { ref, step, inView };
}

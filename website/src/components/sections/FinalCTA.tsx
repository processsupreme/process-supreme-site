"use client";

import { motion } from "framer-motion";
import { CommandLink } from "@/components/ui/CommandLink";

/**
 * Final CTA as the landing sequence: terse, centered, one command.
 */

export function FinalCTA() {
  return (
    <section id="cta" className="border-t border-line bg-deck scroll-mt-14">
      <div className="max-w-container mx-auto px-6 lg:px-10 py-band-lg text-center">
        <motion.p
          initial={{ y: 6 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-tele-sm uppercase text-mute mb-6"
        >
          One clear action
        </motion.p>
        <motion.h2
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-section text-fg"
        >
          Tell us where it hurts.
        </motion.h2>
        <motion.div
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 inline-block"
        >
          <CommandLink href="/contact" tracking="final-cta">
            book a demo
          </CommandLink>
          <p className="mt-5 font-mono text-tele text-dim">
            30 minutes. no pitch deck. bring your drag profile, or just the
            process your team hates the most.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

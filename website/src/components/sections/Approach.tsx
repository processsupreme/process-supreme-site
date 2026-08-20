"use client";

import { motion } from "framer-motion";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";

/**
 * How it works: Diagnose / Build / Run on one rail. Compressed: this is
 * a connective beat, not a destination.
 */

const stations = [
  {
    id: "01",
    glyph: "diagnose" as GlyphName,
    name: "Find the drag",
    note: "We walk one painful process from start to finish, find where the hours and mistakes enter, and estimate what fixing it is worth.",
    deliverable: "You leave with: a workflow map, cost estimate, and recommendation.",
  },
  {
    id: "02",
    glyph: "build" as GlyphName,
    name: "Build the first engine",
    note: "We connect the necessary data and build the smallest working tool that removes the job from your team's plate.",
    deliverable: "You get: working software tested against your real operation.",
  },
  {
    id: "03",
    glyph: "run" as GlyphName,
    name: "Put it to work",
    note: "We launch it with the people who use it, monitor the output, and improve it as the operation changes.",
    deliverable: "You get: deployment, documentation, and a clear support plan.",
  },
];

export function Approach() {
  return (
    <section id="how-it-works" className="py-14 md:py-20 scroll-mt-14">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <p className="font-mono text-tele-sm uppercase text-amber mb-3">
          What working with us looks like
        </p>
        <h2 className="font-display text-section text-fg max-w-[24ch] mb-4">
          Start with one recurring job. Prove the value. Then decide what comes next.
        </h2>
        <p className="text-body text-mute max-w-[64ch] mb-12">
          You do not need a software specification or a plan to rebuild the whole business.
          Bring the process your team is tired of doing by hand.
        </p>

        {/* Desktop: horizontal rail */}
        <div className="relative hidden md:block">
          <div className="absolute top-[5px] left-0 right-0 h-px bg-line" aria-hidden />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[5px] left-0 right-0 h-px bg-amber-deep origin-left"
            aria-hidden
          />
          <div className="absolute top-[1px] left-0 right-0 flex justify-between" aria-hidden>
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className={`w-px ${i % 4 === 0 ? "h-[9px] bg-steel-deep" : "h-[5px] bg-line"}`} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-10 pt-9">
            {stations.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ y: 8 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative"
              >
                <span
                  className="absolute -top-[40px] left-0 w-[11px] h-[11px] rounded-full border-2 border-amber bg-deck"
                  aria-hidden
                />
                <p className="font-mono text-tele-sm text-mute mb-1.5 flex items-center gap-2.5">
                  {s.id} <Glyph name={s.glyph} className="w-5 h-5 text-amber" />
                </p>
                <h3 className="font-display font-bold text-heading text-fg">{s.name}</h3>
                <p className="mt-2 text-body-sm text-mute max-w-[36ch]">{s.note}</p>
                <p className="mt-3 font-mono text-tele text-steel max-w-[40ch]">{s.deliverable}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical rail */}
        <div className="md:hidden border-l border-steel-deep pl-7 space-y-8 relative">
          {stations.map((s) => (
            <div key={s.id} className="relative">
              <span
                className="absolute -left-[33px] top-[6px] w-[11px] h-[11px] rounded-full border-2 border-amber bg-deck"
                aria-hidden
              />
              <p className="font-mono text-tele-sm text-mute mb-1 flex items-center gap-2.5">
                {s.id} <Glyph name={s.glyph} className="w-5 h-5 text-amber" />
              </p>
              <h3 className="font-display font-bold text-heading text-fg">{s.name}</h3>
              <p className="mt-1.5 text-body-sm text-mute">{s.note}</p>
              <p className="mt-3 font-mono text-tele text-steel">{s.deliverable}</p>
            </div>
          ))}
        </div>

        <p className="mt-9 font-mono text-tele text-mute max-w-[66ch]">
          We usually work around the systems you already have. No forced platform
          change. No generic software subscription looking for a problem to solve.
        </p>

        {/* Handoff */}
        <p className="mt-6 font-mono text-tele">
          <a href="#numbers" className="text-steel hover:text-amber transition-colors">
            see what this changed in our own operation ↓
          </a>
        </p>
      </div>
    </section>
  );
}

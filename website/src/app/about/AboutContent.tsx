"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CommandLink } from "@/components/ui/CommandLink";
import { CountUp } from "@/components/animations";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";

/**
 * About as a crew manifest and service record: who is flying the thing,
 * where they have flown it, and the operating principles taped to the
 * panel. Log-structured, not card grids.
 */

const record = [
  {
    t: "15 yrs ago",
    text: "Started operating. Heavy, regulated, multi-location businesses: hundreds of employees, tens of millions in revenue managed.",
  },
  {
    t: "8 yrs ago",
    text: "Hit the same walls every operator hits. Systems that don't talk, reports built by hand, compliance tracked in spreadsheets. Nothing off the shelf could fix it.",
  },
  {
    t: "6 yrs ago",
    text: "Stopped waiting for someone else to. Built the first engines on our own floor: purchasing intelligence to know which products actually made money, automated reporting so leadership woke up informed without managers staying late.",
  },
  {
    t: "today",
    text: "Now we build them for operations like yours. Every engine still starts the same way: a job a team does by hand, and an operator who is done doing it.",
  },
];

const principles = [
  {
    id: "01",
    glyph: "build" as GlyphName,
    name: "Built by operators, for operators",
    note: "Every engine started as a solution to a problem we faced ourselves. We don't build features because they sound good. We build them because we needed them.",
  },
  {
    id: "02",
    glyph: "executive" as GlyphName,
    name: "Data should drive decisions",
    note: "Margins are too thin to guess. Our systems turn raw data into answers an operator can act on the same morning.",
  },
  {
    id: "03",
    glyph: "compliance" as GlyphName,
    name: "Compliance is non-negotiable",
    note: "Zero violations. That is not a goal, it is a requirement. We build systems that keep you audit-ready at all times.",
  },
  {
    id: "04",
    glyph: "run" as GlyphName,
    name: "Systems should just work",
    note: "The best technology disappears into the background. Our engines run automatically, deliver consistently, and give your team its week back.",
  },
];

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-10%" as const },
};

export function AboutContent() {
  return (
    <>
      {/* Manifest head */}
      <section className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 aurora" aria-hidden />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-14 md:py-20">
          <p className="font-mono text-tele-sm uppercase text-amber mb-4">
            About Process Supreme
          </p>
          <h1 className="font-display text-hero text-fg max-w-[16ch]">
            We didn&apos;t start as a software company. We started as{" "}
            <span className="text-amber">operators.</span>
          </h1>
        </div>
      </section>

      {/* Telemetry: operating record numbers */}
      <div className="border-b border-line bg-well">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 font-mono">
          <span className="flex items-baseline gap-2.5 text-tele-sm uppercase">
            <span className="text-amber tabular text-tele font-medium">
              <CountUp to={15} duration={1.5} suffix="+" />
            </span>
            <span className="text-dim">years operating</span>
          </span>
          <span className="flex items-baseline gap-2.5 text-tele-sm uppercase">
            <span className="text-amber tabular text-tele font-medium">
              <CountUp to={7} duration={1.5} />
            </span>
            <span className="text-dim">locations run</span>
          </span>
          <span className="flex items-baseline gap-2.5 text-tele-sm uppercase">
            <span className="text-amber tabular text-tele font-medium">
              $<CountUp to={50} duration={2} />
              M+
            </span>
            <span className="text-dim">revenue managed</span>
          </span>
          <span className="flex items-baseline gap-2.5 text-tele-sm uppercase">
            <span className="text-amber tabular text-tele font-medium">0</span>
            <span className="text-dim">compliance violations</span>
          </span>
        </div>
      </div>

      {/* Service record */}
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <p className="font-mono text-tele-sm uppercase text-amber mb-10">
            The record
          </p>
          <div className="max-w-[52rem]">
            {record.map((r, i) => (
              <motion.div
                key={r.t}
                {...fadeIn}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-[64px_1fr] sm:grid-cols-[92px_1fr] gap-4 py-5 border-b border-line/70 last:border-b-0"
              >
                <span className="font-mono text-tele tabular text-steel pt-0.5">{r.t}</span>
                <p className="text-body text-mute max-w-[62ch]">{r.text}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 font-mono text-tele text-dim max-w-[60ch] leading-[1.8]">
            our deepest work was cannabis
            retail and cultivation, one of the hardest categories in retail
            to run lean.{" "}
            <Link href="/proof" className="text-amber hover:text-amber-bright transition-colors">
              read how it went →
            </Link>
          </p>
        </div>
      </section>

      {/* Operating principles */}
      <section className="bg-well border-b border-line" role="list">
        <div className="max-w-container mx-auto px-6 lg:px-10 pt-12 pb-2">
          <p className="font-mono text-tele-sm uppercase text-amber">
            What we believe
          </p>
        </div>
        {principles.map((p) => (
          <div key={p.id} role="listitem" className="border-b border-line/70 last:border-b-0">
            <div className="max-w-container mx-auto px-6 lg:px-10 py-6 grid md:grid-cols-[92px_300px_1fr] items-baseline gap-x-5 gap-y-2">
              <span className="font-mono text-tele tabular text-steel flex items-center gap-3">
                {p.id} <Glyph name={p.glyph} className="w-6 h-6 text-mute" />
              </span>
              <h2 className="font-display font-bold text-fg text-[1.05rem] tracking-[-0.01em]">
                {p.name}
              </h2>
              <p className="text-body-sm text-mute max-w-[60ch]">{p.note}</p>
            </div>
          </div>
        ))}
        <div className="max-w-container mx-auto px-6 lg:px-10 py-8" />
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <p className="text-body-lg text-fg max-w-[36ch] mb-8">
            Ready to work with operators who understand?
          </p>
          <CommandLink href="/contact" tracking="about-cta">request a process review</CommandLink>
        </div>
      </section>
    </>
  );
}

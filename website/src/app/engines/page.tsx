import type { Metadata } from "next";
import { CommandLink } from "@/components/ui/CommandLink";
import { dragFaults, recoveryLine } from "@/data/dragCheck";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";

export const metadata: Metadata = {
  title: "What We Automate",
  description:
    "See the reporting, purchasing, system-sync, inventory, compliance, and back-office work Process Supreme can automate.",
  openGraph: {
    title: "What We Automate | Process Supreme",
    description: "See the recurring operational work Process Supreme can turn into software that runs on its own.",
    images: ["/og/engines.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Automate | Process Supreme",
    description: "See the recurring operational work Process Supreme can turn into software that runs on its own.",
    images: ["/og/engines.png"],
  },
};

/**
 * Engines as prescriptions: every row pairs a symptom you recognize with
 * the engine that removes it and what it typically gives back.
 */
export default function EnginesPage() {
  return (
    <>
      {/* Title plate */}
      <section className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 aurora" aria-hidden />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-14 md:py-20">
          <p className="font-mono text-tele-sm uppercase text-amber mb-4">
            What we automate
          </p>
          <h1 className="font-display text-section text-fg max-w-[22ch]">
            The work that falls between your systems should not fall to your team.
          </h1>
          <p className="mt-5 font-mono text-tele text-mute max-w-[58ch] leading-[1.8]">
            These are common examples, not a product catalog. We usually connect
            the systems you already use, fill the gap between them, and build the
            exact tool your operation is missing.
          </p>
          <p className="mt-4 text-body text-fg max-w-[62ch]">
            We call each finished system an <span className="text-amber">engine</span>.
            It takes one recurring job, from raw inputs to finished output, and
            runs it automatically.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
          <p className="font-mono text-tele-sm uppercase text-amber mb-3">
            Custom does not mean starting over
          </p>
          <h2 className="font-display text-section text-fg max-w-[24ch]">
            Keep the systems that work. Fix the work between them.
          </h2>
          <div className="mt-9 max-w-[52rem] border-t border-line font-mono text-tele leading-[1.8]">
            <p className="py-4 border-b border-line text-mute">
              <span className="text-amber mr-3">01</span>
              Start with one report, workflow, or decision. The first project does not need to become a company-wide rebuild.
            </p>
            <p className="py-4 border-b border-line text-mute">
              <span className="text-amber mr-3">02</span>
              Work around the POS, accounting, payroll, inventory, and spreadsheet tools you already rely on.
            </p>
            <p className="py-4 border-b border-line text-mute">
              <span className="text-amber mr-3">03</span>
              Build around how your operation actually works instead of forcing your team into another generic workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Prescription rows */}
      <section className="bg-well border-b border-line">
        <div className="border-b border-line">
          <div className="max-w-container mx-auto px-6 lg:px-10 py-10 md:py-12">
            <p className="font-mono text-tele-sm uppercase text-amber mb-3">
              Common jobs we take off your team
            </p>
            <h2 className="font-display text-section text-fg max-w-[22ch]">
              Find the line that sounds like your week.
            </h2>
            <p className="mt-4 font-mono text-tele text-mute max-w-[60ch] leading-[1.8]">
              Typical recoveries come from real builds at $35 per loaded labor hour.
              They are a way to size the problem, not a quote for your operation.
            </p>
          </div>
        </div>
        <div role="list">
          {dragFaults.map((fault) => (
            <div
              key={fault.id}
              role="listitem"
              className="border-b border-line last:border-b-0"
            >
              <div className="max-w-container mx-auto px-6 lg:px-10 py-7 grid md:grid-cols-[64px_36px_1fr_1fr] gap-x-6 gap-y-3">
                <span className="font-mono text-tele tabular text-dim">{fault.id}</span>
                <span className="hidden md:block text-amber">
                  <Glyph
                    name={fault.engine.replace(/_engine$/, "") as GlyphName}
                    className="w-6 h-6"
                  />
                </span>
                <div>
                  <p className="font-display font-bold text-fg text-[1.05rem] tracking-[-0.01em] max-w-[34ch]">
                    {fault.symptom}
                  </p>
                </div>
                <div className="font-mono text-tele leading-[1.8] md:border-l md:border-line md:pl-8">
                  <p>
                    <span className="text-steel">we build: </span>
                    <span className="text-amber">{fault.engine}</span>
                    <span className="text-mute">: {fault.prescription}</span>
                  </p>
                  <p className="text-dim mt-1.5">
                    typical recovery:{" "}
                    <span className="text-amber-bright tabular">
                      {recoveryLine(fault)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing commands */}
      <section className="max-w-container mx-auto px-6 lg:px-10 py-band">
        <p className="text-body-lg text-fg max-w-[44ch]">
          You do not need to know which engine you need. Show us the work your
          team keeps doing by hand and we will help name the fix.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CommandLink href="/#drag-check" cursor={false}>run the drag check</CommandLink>
          <CommandLink href="/contact">show us the process</CommandLink>
        </div>
      </section>
    </>
  );
}

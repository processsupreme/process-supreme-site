import type { Metadata } from "next";
import { CommandLink } from "@/components/ui/CommandLink";
import { dragFaults, recoveryLine } from "@/data/dragCheck";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";

export const metadata: Metadata = {
  title: "Engines",
  description:
    "Name the pain, get the prescription. Nine engines matched to nine symptoms, priced in hours and dollars from real builds.",
  openGraph: {
    title: "Engines | Process Supreme",
    description: "Name the pain, get the prescription. Nine engines matched to nine symptoms, priced in hours and dollars from real builds.",
    images: ["/og/engines.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engines | Process Supreme",
    description: "Name the pain, get the prescription. Nine engines matched to nine symptoms, priced in hours and dollars from real builds.",
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
            Engines, by symptom
          </p>
          <h1 className="font-display text-section text-fg max-w-[22ch]">
            Name the pain. The engine that removes it has a name too.
          </h1>
          <p className="mt-5 font-mono text-tele text-mute max-w-[58ch] leading-[1.8]">
            <span className="text-dim">{"// "}</span>an engine takes a job your
            team does by hand and runs it for them. find your symptom below.
            recoveries are typical figures from real builds at $35/hr loaded
            cost, not a quote. yours is missing? that is the fun part.
          </p>
        </div>
      </section>

      {/* Prescription rows */}
      <section className="bg-well border-b border-line" role="list">
        {dragFaults.map((fault) => (
          <div key={fault.id} role="listitem" className="border-b border-line last:border-b-0">
            <div className="max-w-container mx-auto px-6 lg:px-10 py-7 grid md:grid-cols-[64px_36px_1fr_1fr] gap-x-6 gap-y-3">
              <span className="font-mono text-tele tabular text-dim">{fault.id}</span>
              <span className="hidden md:block text-amber">
                <Glyph name={fault.engine.replace(/_engine$/, "") as GlyphName} className="w-6 h-6" />
              </span>
              <div>
                <p className="font-display font-bold text-fg text-[1.05rem] tracking-[-0.01em] max-w-[34ch]">
                  {fault.symptom}
                </p>
              </div>
              <div className="font-mono text-tele leading-[1.8] md:border-l md:border-line md:pl-8">
                <p>
                  <span className="text-steel">℞ </span>
                  <span className="text-amber">{fault.engine}</span>
                  <span className="text-mute">: {fault.prescription}</span>
                </p>
                <p className="text-dim mt-1.5">
                  typical recovery:{" "}
                  <span className="text-amber-bright tabular">{recoveryLine(fault)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Closing commands */}
      <section className="max-w-container mx-auto px-6 lg:px-10 py-band">
        <p className="text-body-lg text-fg max-w-[44ch]">
          Not sure which switch is yours? The drag check prices your week in
          sixty seconds.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CommandLink href="/#drag-check" cursor={false}>run the drag check</CommandLink>
          <CommandLink href="/contact">tell us where it hurts</CommandLink>
        </div>
      </section>
    </>
  );
}

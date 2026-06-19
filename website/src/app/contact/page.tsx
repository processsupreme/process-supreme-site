import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where it hurts. 30 minutes, no pitch deck. Bring the process your team hates the most.",
  openGraph: {
    title: "Contact | Process Supreme",
    description: "Tell us where it hurts. 30 minutes, no pitch deck. Bring the process your team hates the most.",
    images: ["/og/contact.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Process Supreme",
    description: "Tell us where it hurts. 30 minutes, no pitch deck. Bring the process your team hates the most.",
    images: ["/og/contact.png"],
  },
};

/**
 * Contact as the comms panel: a prompt-styled header, a short pre-contact
 * checklist, and the transmission form in a console frame.
 */
export default function ContactPage() {
  return (
    <>
      {/* Comms head */}
      <section className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 aurora" aria-hidden />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-14 md:py-20">
          <p className="font-mono text-tele-sm uppercase text-amber mb-4">
            Contact
          </p>
          <h1 className="font-display text-section text-fg">
            <span className="font-mono text-amber font-normal">$ </span>
            Tell us where it hurts.
          </h1>
          <p className="mt-5 font-mono text-tele text-mute max-w-[56ch] leading-[1.8]">
            <span className="text-dim">{"// "}</span>bring the process your
            team hates the most and we will tell you if an engine can take it.
          </p>
        </div>
      </section>

      {/* What to expect: one telemetry line */}
      <div className="border-b border-line bg-well">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-4 flex flex-wrap gap-x-10 gap-y-2 font-mono text-tele-sm uppercase">
          <span className="text-dim">
            <span className="text-amber">[✓]</span> 30 minutes, real data, no pitch deck
          </span>
          <span className="text-dim">
            <span className="text-amber">[✓]</span> your operation, your pain points
          </span>
          <span className="text-dim">
            <span className="text-amber">[✓]</span> operators talking to operators
          </span>
        </div>
      </div>

      {/* Transmission form */}
      <section className="relative py-band overflow-hidden">
        <div className="absolute inset-0 aurora" aria-hidden />
        <div className="relative max-w-[44rem] mx-auto px-6">
          <div className="glass rounded-panel overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line font-mono text-tele-sm uppercase">
              <span className="flex items-center gap-2.5 text-dim">
                <span className="w-[7px] h-[7px] rounded-full bg-amber" aria-hidden />
                send a message
              </span>
              <span className="text-dim">reply within 24 hrs</span>
            </div>
            <div className="p-6 sm:p-8">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

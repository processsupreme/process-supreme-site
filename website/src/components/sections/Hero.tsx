import Link from "next/link";
import { LiquidField } from "@/components/ui/LiquidField";

/**
 * Hero: minimal and instantly legible. Full contrast within 300ms of
 * paint; animation settles position, never opacity. One panel, one
 * headline, one sub-line, the command bar.
 */

function Crosshair({ className }: { className: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className={`absolute ${className} text-steel-deep`} aria-hidden>
      <path d="M7 0 V14 M0 7 H14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="px-3 sm:px-5 lg:px-10 pt-4 pb-5">
      <div className="relative bg-panel border border-line rounded-panel shadow-panel overflow-hidden">
        <div className="relative">
          {/* Atmosphere: molten amber liquid under glass */}
          <LiquidField className="absolute inset-0" intensity={0.9} />
          <div className="absolute inset-0 bg-deck/50" aria-hidden />
          <div className="absolute inset-0 panel-grid" aria-hidden />
          <Crosshair className="top-5 left-5" />
          <Crosshair className="bottom-5 right-5" />

          <div className="relative px-6 sm:px-10 lg:px-14 py-14 md:py-20 lg:py-24">
            <p className="font-mono text-tele-sm uppercase tracking-wider text-amber mb-6 flex items-center gap-2.5">
              <span className="w-[7px] h-[7px] rounded-full bg-amber" aria-hidden />
              Built by operators, for operators
            </p>

            <h1 className="hero-settle font-display text-hero text-fg max-w-[14ch]">
              Cut <span className="text-amber">the fat</span> out of how your
              business runs.
            </h1>

            <p className="hero-settle-late mt-7 text-body-lg text-mute max-w-[56ch] leading-relaxed">
              We find the hours and dollars your operation loses to manual
              work, then build the exact software that gets them back. Built
              by people who run businesses, not software companies guessing at
              your problems.
            </p>
          </div>
        </div>

        {/* Command bar */}
        <div className="relative border-t border-line grid sm:grid-cols-[1fr_auto] font-mono text-tele bg-panel">
          <Link
            href="/contact"
            data-tracking="hero-command-cta"
            className="group flex items-center gap-3 px-6 py-4 hover:bg-panel-up transition-colors"
          >
            <span className="text-amber">$</span>
            <span className="text-fg group-hover:text-amber transition-colors">
              tell us where it hurts
            </span>
            <span className="cursor-blink inline-block w-[8px] h-[15px] bg-amber" aria-hidden />
            <span className="ml-auto text-dim hidden md:block">[enter] book a demo →</span>
          </Link>
          <a
            href="#drag-check"
            className="flex items-center justify-center gap-2 px-6 py-4 border-t sm:border-t-0 sm:border-l border-line text-steel hover:text-amber transition-colors"
          >
            run the drag check ↓
          </a>
        </div>
      </div>
    </section>
  );
}

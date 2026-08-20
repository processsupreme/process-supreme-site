"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * The left page-edge ruler, now an instrument: minor ticks for texture,
 * a steel marker per section (clickable, jumps there), and an amber
 * indicator that tracks scroll with the current section's name beside
 * it. Steel for the rail, amber only for the current position.
 * Desktop only; decorative ticks are hidden from assistive tech, the
 * section markers are real buttons.
 */

const SECTION_LABELS: Record<string, string> = {
  "what-we-automate": "what this looks like",
  "drag-check": "the problem, priced",
  demos: "watch an engine run",
  purchasing: "how deep an engine goes",
  "how-it-works": "how it works",
  numbers: "our own numbers",
  "is-this-you": "is this you",
  cta: "one clear action",
};

interface Marker {
  id: string;
  label: string;
  /** 0..1 along the scrollable height */
  fraction: number;
}

export function PageRuler() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const found: Marker[] = [];
      for (const [id, label] of Object.entries(SECTION_LABELS)) {
        const el = document.getElementById(id);
        if (!el || scrollable <= 0) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        found.push({ id, label, fraction: Math.min(1, Math.max(0, top / scrollable)) });
      }
      setMarkers(found);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);

        // current section: the last one whose top has passed 40% of viewport
        let current: string | null = null;
        for (const id of Object.keys(SECTION_LABELS)) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
            current = id;
          }
        }
        setActiveId(current);
      });
    };

    // sections settle after fonts/images; measure twice
    measure();
    const t = setTimeout(measure, 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  const label = activeId ? SECTION_LABELS[activeId] : null;

  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-5 z-40 hidden lg:block pointer-events-none"
    >
      {/* Decorative minor ticks */}
      <div className="absolute inset-0 flex flex-col justify-between py-20" aria-hidden>
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className={`block h-px ml-1.5 ${i % 6 === 0 ? "w-3.5 bg-steel-deep" : "w-2 bg-line"}`}
          />
        ))}
      </div>

      {/* Section markers: steel, clickable */}
      <nav aria-label="Page sections" className="absolute inset-y-20 left-0 right-0">
        {markers.map((m) => (
          <button
            key={m.id}
            onClick={() =>
              document.getElementById(m.id)?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label={`Jump to: ${m.label}`}
            className="pointer-events-auto absolute left-0 w-5 h-3 -translate-y-1/2 group"
            style={{ top: `${m.fraction * 100}%` }}
          >
            <span className="block h-px w-3 ml-1 bg-steel group-hover:bg-amber transition-colors" />
          </button>
        ))}

        {/* Amber position indicator + current section name, set vertical
            along the rail so it never sits over content */}
        <div
          className="absolute left-0 -translate-y-1/2 flex items-center gap-1.5"
          style={{ top: `${progress * 100}%` }}
          aria-hidden
        >
          <span className="block w-[7px] h-[7px] rounded-full bg-amber ml-[3px] shadow-glow shrink-0" />
          {label && (
            <span className="font-mono text-tele-sm text-amber/90 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 bg-deck/80 py-1.5 rounded-hard max-h-[220px] overflow-hidden">
              {label}
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}

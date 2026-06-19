import { useId } from "react";
import { palette } from "@/styles/tokens";

/**
 * Custom instrument glyphs, machined in three dimensions:
 * - depth: the structure re-struck behind itself in deep steel, an
 *   extruded edge that reads as physical thickness
 * - face: a glassy gradient plate on the main silhouette
 * - structure: main strokes in currentColor (rows dim and light them)
 * - detail: engineering linework, always steel
 * - signal: exactly one amber element per glyph, the part that matters
 *
 * 24px grid, round caps, purpose-built. Not a stock set.
 */

export type GlyphName =
  | "reporting"
  | "sync"
  | "inventory"
  | "margin"
  | "purchasing"
  | "labor"
  | "compliance"
  | "intake"
  | "billing"
  | "executive"
  | "bonus"
  | "diagnose"
  | "build"
  | "run";

const STEEL = palette.steel;
const STEEL_DEEP = palette.steelDeep;
const AMBER = palette.amber;

interface GlyphArt {
  structure: React.ReactNode;
  /** silhouette plate filled with the glass gradient */
  face?: (gid: string) => React.ReactNode;
  detail?: React.ReactNode;
  signal?: React.ReactNode;
}

const art: Record<GlyphName, GlyphArt> = {
  reporting: {
    face: (g) => <rect x="5" y="3" width="14" height="18" rx="1.5" fill={`url(#${g})`} stroke="none" />,
    structure: <rect x="5" y="3" width="14" height="18" rx="1.5" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M8.5 7.5h7M8.5 11h7M8.5 14.5h4" />
      </g>
    ),
    signal: <path d="M14.5 17.5l1.7 1.7 3-3" stroke={AMBER} strokeWidth="1.8" />,
  },
  sync: {
    face: (g) => (
      <g fill={`url(#${g})`} stroke="none">
        <rect x="3" y="4.5" width="7.5" height="6" rx="1" />
        <rect x="13.5" y="13.5" width="7.5" height="6" rx="1" />
      </g>
    ),
    structure: (
      <>
        <rect x="3" y="4.5" width="7.5" height="6" rx="1" />
        <rect x="13.5" y="13.5" width="7.5" height="6" rx="1" />
      </>
    ),
    detail: (
      <g stroke={STEEL}>
        <path d="M10.5 7.5h8v3M13.5 16.5h-8v-3" />
        <path d="M16.5 10.5l2-2 2 2M7.5 13.5l-2 2 2 2" strokeWidth="1.3" />
      </g>
    ),
    signal: <circle cx="12" cy="12" r="1.6" fill={AMBER} stroke="none" />,
  },
  inventory: {
    structure: <path d="M4 19.5V9M9.5 19.5V4.5M15 19.5V11" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M2.5 19.5h19" />
        <path d="M2.5 4.5h2M2.5 9h2M2.5 13.5h2" strokeOpacity="0.7" />
      </g>
    ),
    signal: (
      <>
        <path d="M20 19.5v-3.5" stroke={AMBER} strokeWidth="2.2" />
        <circle cx="20" cy="12.5" r="1.5" fill={AMBER} stroke="none" />
      </>
    ),
  },
  margin: {
    face: (g) => <circle cx="12" cy="12" r="8.5" fill={`url(#${g})`} stroke="none" />,
    structure: <circle cx="12" cy="12" r="8.5" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M12 3.5v17" strokeOpacity="0.6" />
        <path d="M12 12l6.6-5.3" />
      </g>
    ),
    signal: (
      <path
        d="M12 3.5A8.5 8.5 0 0 1 18.6 6.7L12 12z"
        fill={AMBER}
        fillOpacity="0.35"
        stroke={AMBER}
        strokeWidth="1.2"
      />
    ),
  },
  purchasing: {
    face: (g) => <path d="M4 8l8-4 8 4v8.5l-8 4-8-4z" fill={`url(#${g})`} stroke="none" />,
    structure: <path d="M4 8l8-4 8 4v8.5l-8 4-8-4z" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M4 8l8 4 8-4M12 12v8.5" />
        <path d="M14.5 6.75l-5 2.5" strokeOpacity="0.7" />
      </g>
    ),
    signal: (
      <>
        <circle cx="17.5" cy="17" r="3.2" fill={palette.deck} fillOpacity="0.85" stroke={AMBER} />
        <path d="M16.2 17l1 1 1.7-1.8" stroke={AMBER} strokeWidth="1.4" />
      </>
    ),
  },
  labor: {
    face: (g) => <circle cx="12" cy="12" r="8.5" fill={`url(#${g})`} stroke="none" />,
    structure: <circle cx="12" cy="12" r="8.5" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M12 3.5V5M20.5 12H19M12 20.5V19M3.5 12H5" />
        <path d="M17.6 6.4l-1 1M17.6 17.6l-1-1M6.4 17.6l1-1M6.4 6.4l1 1" strokeOpacity="0.6" />
      </g>
    ),
    signal: <path d="M12 7.5V12l3.6 2" stroke={AMBER} strokeWidth="1.8" />,
  },
  compliance: {
    face: (g) => (
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" fill={`url(#${g})`} stroke="none" />
    ),
    structure: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />,
    detail: (
      <path
        d="M12 5.2l5 2.1v4.6c0 3.4-2.2 5.7-5 6.9"
        stroke={STEEL}
        strokeOpacity="0.6"
        strokeWidth="1.1"
      />
    ),
    signal: <path d="M8.5 11.8l2.4 2.4 4.4-4.4" stroke={AMBER} strokeWidth="1.8" />,
  },
  intake: {
    face: (g) => <path d="M4 5h16l-6 7v5.5l-4 2.5v-8z" fill={`url(#${g})`} stroke="none" />,
    structure: <path d="M4 5h16l-6 7v5.5l-4 2.5v-8z" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M7.5 2.5L9 4M12 2v2M16.5 2.5L15 4" strokeWidth="1.3" />
      </g>
    ),
    signal: <circle cx="12" cy="21.2" r="1.4" fill={AMBER} stroke="none" />,
  },
  billing: {
    face: (g) => <rect x="4" y="4" width="12" height="16" rx="1.5" fill={`url(#${g})`} stroke="none" />,
    structure: <rect x="4" y="4" width="12" height="16" rx="1.5" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M7 8.5h6M7 12h6M7 15.5h3.5" />
      </g>
    ),
    signal: (
      <>
        <path d="M17 13.5c2.2 0 3.8 1.6 3.8 3.7 0 2.1-1.6 3.8-3.8 3.8" stroke={AMBER} />
        <path d="M17.2 18.8L15.5 20.4l1.7 1.6" stroke={AMBER} strokeWidth="1.3" />
      </>
    ),
  },
  executive: {
    face: (g) => <rect x="3" y="4" width="18" height="13" rx="1.5" fill={`url(#${g})`} stroke="none" />,
    structure: <rect x="3" y="4" width="18" height="13" rx="1.5" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M7 13.5V11M11 13.5V9.5M15 13.5v-2.5" />
        <path d="M12 17v3M8.5 20.5h7" />
      </g>
    ),
    signal: <path d="M5.5 9.5l4-2.5 3.5 1.5 5.5-3" stroke={AMBER} strokeWidth="1.6" />,
  },
  bonus: {
    structure: <path d="M4 19.5v-4h4v4M10 19.5v-7.5h4v7.5" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M3 19.5h18" />
        <path d="M16 19.5V8h4v11.5" />
      </g>
    ),
    signal: (
      <path
        d="M18 2.6l.85 1.7 1.85.3-1.35 1.3.3 1.85-1.65-.85-1.65.85.3-1.85-1.35-1.3 1.85-.3z"
        fill={AMBER}
        fillOpacity="0.85"
        stroke={AMBER}
        strokeWidth="0.8"
      />
    ),
  },
  diagnose: {
    face: (g) => <circle cx="12" cy="12" r="7" fill={`url(#${g})`} stroke="none" />,
    structure: <circle cx="12" cy="12" r="7" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M12 2.5V6M21.5 12H18M12 21.5V18M2.5 12H6" />
        <circle cx="12" cy="12" r="4" strokeOpacity="0.45" strokeDasharray="2 2.5" />
      </g>
    ),
    signal: <circle cx="12" cy="12" r="1.6" fill={AMBER} stroke="none" />,
  },
  build: {
    face: (g) => <path d="M12 3.5l7 4v9l-7 4-7-4v-9z" fill={`url(#${g})`} stroke="none" />,
    structure: <path d="M12 3.5l7 4v9l-7 4-7-4v-9z" />,
    detail: (
      <g stroke={STEEL}>
        <path
          d="M12 3.5v4M19 7.5l-3.4 2M19 16.5l-3.4-2M12 20.5v-4M5 16.5l3.4-2M5 7.5l3.4 2"
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />
      </g>
    ),
    signal: (
      <>
        <circle cx="12" cy="12" r="2.8" stroke={AMBER} />
        <circle cx="12" cy="12" r="0.9" fill={AMBER} stroke="none" />
      </>
    ),
  },
  run: {
    structure: <path d="M4 17a8.5 8.5 0 0 1 16 0" />,
    detail: (
      <g stroke={STEEL}>
        <path d="M5.5 13l1.3.8M12 8.5v1.5M18.5 13l-1.3.8" strokeWidth="1.3" />
        <path d="M4 20h16" strokeOpacity="0.5" />
      </g>
    ),
    signal: (
      <>
        <path d="M12 17l4.2-4.6" stroke={AMBER} strokeWidth="1.8" />
        <circle cx="12" cy="17" r="1.5" fill={AMBER} stroke="none" />
      </>
    ),
  },
};

interface GlyphProps {
  name: GlyphName;
  className?: string;
}

export function Glyph({ name, className }: GlyphProps) {
  const gid = useId().replace(/[:]/g, "");
  const a = art[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={STEEL} stopOpacity="0.30" />
          <stop offset="55%" stopColor={STEEL} stopOpacity="0.08" />
          <stop offset="100%" stopColor={STEEL} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* depth: the extruded edge */}
      <g transform="translate(1.4 1.5)" stroke={STEEL_DEEP} opacity="0.75">
        {a.structure}
      </g>
      {/* glass face */}
      {a.face?.(gid)}
      {/* main structure in the inherited color */}
      <g>{a.structure}</g>
      {a.detail}
      {a.signal}
    </svg>
  );
}

/**
 * Canonical design tokens for Process Supreme.
 *
 * Direction (June 2026): FLIGHT DECK. The page is an instrument panel.
 * Cool graphite surfaces, hairline rules, phosphor-amber data, tabular
 * numerals, mono telemetry. Dark, calm, every number legible at a glance.
 *
 * All colors, type, spacing, radii, and shadows flow from this file into
 * Tailwind. No hardcoded hex values in components. Rendered for review
 * at /styleguide.
 */

/** Raw palette. Prefer the semantic `colors` map in components. */
export const palette = {
  // Graphite surfaces, cool and matte
  deck: "#121316", // page background
  well: "#0D0E10", // recessed bands, full-bleed boards
  panel: "#17191D", // raised instrument panel
  panelUp: "#1C1F24", // panel-on-panel, hover surfaces

  // Hairlines
  line: "#2A2D33", // default rule
  lineBright: "#3D424B", // emphasized rule, hover borders

  // Text on graphite
  fg: "#E9EAEC", // primary
  mute: "#9BA1AB", // secondary (AA on deck and panel)
  dim: "#787F8A", // labels, captions (AA large/mono on deck)

  // Phosphor amber: the primary instrument accent
  amber: "#E8A33D",
  amberBright: "#F2BC66", // hover, glow cores
  amberDeep: "#8A6324", // structural amber, gauge arcs

  // Steel: the cool secondary. Glyph details, glass rim light. Always
  // quieter than amber, never the headline color.
  steel: "#7FB2C9",
  steelDeep: "#3A5564",

  // Status (sparing)
  ok: "#9FD08C", // settled / success readouts
  alert: "#E2705C", // critical faults only
} as const;

/** Semantic color tokens, exposed as Tailwind color names. */
export const colors = {
  deck: palette.deck,
  well: palette.well,
  panel: palette.panel,
  "panel-up": palette.panelUp,
  line: palette.line,
  "line-bright": palette.lineBright,
  fg: palette.fg,
  mute: palette.mute,
  dim: palette.dim,
  amber: palette.amber,
  "amber-bright": palette.amberBright,
  "amber-deep": palette.amberDeep,
  steel: palette.steel,
  "steel-deep": palette.steelDeep,
  ok: palette.ok,
  alert: palette.alert,
} as const;

/**
 * Text conventions:
 * - text-fg     → primary text
 * - text-mute   → secondary text
 * - text-dim    → mono labels, telemetry, captions
 * - text-amber  → live data, accents, the instrument voice
 * - text-ok     → settled status lines
 * - text-alert  → critical faults only, never decoration
 */

/** Font stacks. CSS variables loaded in app/layout.tsx via next/font. */
export const fonts = {
  display: {
    name: "Archivo",
    cssVar: "--font-archivo",
    tailwind: "font-display",
    role: "Headlines: extrabold, tight tracking, near-flush leading",
  },
  body: {
    name: "Archivo",
    cssVar: "--font-archivo",
    tailwind: "font-body",
    role: "Body and UI: regular and medium weights",
  },
  mono: {
    name: "JetBrains Mono",
    cssVar: "--font-jetbrains",
    tailwind: "font-mono",
    role: "Telemetry, readouts, labels, commands, the brand wordmark",
  },
} as const;

/** Fluid type scale (registered as Tailwind fontSize entries). */
export const typeScale = {
  // Display: Archivo extrabold, tracking applied via utility classes
  "hero": ["clamp(2.6rem, 6.5vw, 5.2rem)", { lineHeight: "0.98", fontWeight: "800", letterSpacing: "-0.025em" }],
  "section": ["clamp(1.9rem, 3.8vw, 2.9rem)", { lineHeight: "1.04", fontWeight: "800", letterSpacing: "-0.02em" }],
  "heading": ["clamp(1.3rem, 2.2vw, 1.7rem)", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" }],
  // Instrument numerals
  "numeral": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1", fontWeight: "700", letterSpacing: "-0.01em" }],
  // Body
  "body-lg": ["1.125rem", { lineHeight: "1.65" }],
  "body": ["1rem", { lineHeight: "1.65" }],
  "body-sm": ["0.875rem", { lineHeight: "1.55" }],
  // Telemetry
  "tele": ["0.8125rem", { lineHeight: "1.6" }],
  "tele-sm": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
} as const;

export const spacing = {
  "band": "4.5rem", // standard section band
  "band-lg": "8rem", // generous band
  "strip": "1.25rem", // compressed telemetry strips
} as const;

export const maxWidth = {
  container: "82rem", // wide: the panel wants room
  prose: "34rem",
} as const;

/** Instrument hardware: small radii, no soft corners. */
export const borderRadius = {
  panel: "6px",
  inset: "4px",
  hard: "2px",
} as const;

export const boxShadow = {
  panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 50px rgba(0,0,0,0.45)",
  glow: "0 0 14px rgba(232,163,61,0.35)",
} as const;

"use client";

import { Button } from "@/components/ui/Button";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";
import { LiquidField } from "@/components/ui/LiquidField";
import {
  TerminalPanel,
  type TerminalLine,
  type TerminalRole,
} from "@/components/ui/TerminalPanel";
import { colors, fonts, typeScale } from "@/styles/tokens";

/* ------------------------------------------------------------------ */
/* Reference data                                                      */
/* ------------------------------------------------------------------ */

const surfaceColors = [
  { name: "deck", value: colors.deck, usage: "Page background" },
  { name: "well", value: colors.well, usage: "Recessed bands, boards, screens" },
  { name: "panel", value: colors.panel, usage: "Raised instrument panels" },
  { name: "panel-up", value: colors["panel-up"], usage: "Panel-on-panel, hover" },
  { name: "line", value: colors.line, usage: "Default hairline rule" },
  { name: "line-bright", value: colors["line-bright"], usage: "Emphasized rule" },
];

const signalColors = [
  { name: "fg", value: colors.fg, usage: "Primary text" },
  { name: "mute", value: colors.mute, usage: "Secondary text" },
  { name: "dim", value: colors.dim, usage: "Labels, telemetry" },
  { name: "amber", value: colors.amber, usage: "Live data, the instrument voice" },
  { name: "amber-bright", value: colors["amber-bright"], usage: "Hover, warn values" },
  { name: "amber-deep", value: colors["amber-deep"], usage: "Structural amber" },
  { name: "steel", value: colors.steel, usage: "Cool secondary: glyph detail, glass rim" },
  { name: "ok", value: colors.ok, usage: "Settled status lines" },
  { name: "alert", value: colors.alert, usage: "Critical faults only" },
];

const scaleSamples = [
  { token: "hero", className: "text-hero font-display" },
  { token: "section", className: "text-section font-display" },
  { token: "heading", className: "text-heading font-display" },
  { token: "numeral", className: "text-numeral font-display text-amber tabular" },
  { token: "body-lg", className: "text-body-lg" },
  { token: "body", className: "text-body" },
  { token: "tele", className: "text-tele font-mono" },
  { token: "tele-sm", className: "text-tele-sm font-mono uppercase" },
];

const terminalRoles: { role: TerminalRole; usage: string }[] = [
  { role: "prompt", usage: "The $ sigil" },
  { role: "command", usage: "Typed command text" },
  { role: "key", usage: "Metric or engine name" },
  { role: "value", usage: "Metric value" },
  { role: "muted", usage: "Narration, punctuation" },
  { role: "success", usage: "Settled outcomes" },
  { role: "warn", usage: "Flagged values" },
];

const demoLines: TerminalLine[] = [
  {
    segments: [
      { text: "$ ", role: "prompt" },
      { text: "run process_supreme", role: "command" },
    ],
    delay: 0,
  },
  {
    segments: [{ text: "→ checking the operation for drag...", role: "muted" }],
    delay: 1.0,
  },
  {
    segments: [
      { text: "→ ", role: "muted" },
      { text: "manual_reporting", role: "key" },
      { text: "       ", role: "muted" },
      { text: "14 hrs/week", role: "value" },
    ],
    delay: 1.6,
  },
  {
    segments: [
      { text: "→ ", role: "muted" },
      { text: "untrusted_data", role: "key" },
      { text: "         ", role: "muted" },
      { text: "flagged", role: "warn" },
    ],
    delay: 2.1,
  },
  {
    segments: [{ text: "✓ fat cut. operation lean.", role: "success" }],
    delay: 2.9,
    spaceBefore: true,
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <p className="font-mono text-tele-sm uppercase text-amber mb-6">{title}</p>
      {children}
    </section>
  );
}

function Swatch({ name, value, usage }: { name: string; value: string; usage: string }) {
  return (
    <div className="bg-panel border border-line rounded-inset overflow-hidden">
      <div className="h-14 border-b border-line" style={{ backgroundColor: value }} />
      <div className="p-3.5">
        <p className="font-mono text-tele text-fg">{name}</p>
        <p className="font-mono text-tele-sm text-dim mt-1 uppercase">{value}</p>
        <p className="text-body-sm text-mute mt-2">{usage}</p>
      </div>
    </div>
  );
}

export function StyleguideContent() {
  return (
    <div className="py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <p className="font-mono text-tele-sm uppercase text-amber mb-3">
          Design system
        </p>
        <h1 className="font-display text-section text-fg mb-3">Styleguide</h1>
        <p className="font-mono text-tele text-mute mb-16 max-w-[56ch]">
          The as-built system, captured
          as tokens. source of truth:{" "}
          <span className="text-fg">src/styles/tokens.ts</span>. internal page,
          not indexed.
        </p>

        <Section title="surfaces and hairlines">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {surfaceColors.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Section>

        <Section title="text and signals">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {signalColors.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Section>

        <Section title="typefaces">
          <div className="grid md:grid-cols-3 gap-3">
            {[fonts.display, fonts.mono].map((font, i) => (
              <div key={`${font.name}-${i}`} className="bg-panel border border-line rounded-inset p-5">
                <p className={`text-3xl text-fg mb-3 ${font.tailwind === "font-mono" ? "font-mono" : "font-display font-extrabold"}`}>
                  Aa
                </p>
                <p className="text-body-sm text-fg">{font.name}</p>
                <p className="font-mono text-tele-sm text-dim mt-1">{font.tailwind}</p>
                <p className="text-body-sm text-mute mt-2">{font.role}</p>
              </div>
            ))}
            <div className="bg-panel border border-line rounded-inset p-5">
              <p className="text-3xl text-fg mb-3 tabular font-display font-bold">0123</p>
              <p className="text-body-sm text-fg">Tabular numerals</p>
              <p className="font-mono text-tele-sm text-dim mt-1">.tabular</p>
              <p className="text-body-sm text-mute mt-2">All instrument data aligns</p>
            </div>
          </div>
        </Section>

        <Section title="type scale">
          <div className="space-y-7 bg-panel border border-line rounded-panel p-7">
            {scaleSamples.map((sample) => (
              <div key={sample.token}>
                <p className="font-mono text-tele-sm text-dim mb-2">
                  text-{sample.token} ·{" "}
                  {typeScale[sample.token as keyof typeof typeScale][0]}
                </p>
                <p className={`${sample.className} text-fg`}>
                  Cut the fat out of how your business runs.
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="controls">
          <div className="flex flex-wrap items-center gap-5 bg-panel border border-line rounded-panel p-7">
            <Button variant="primary">Request a process review →</Button>
            <Button variant="secondary">See how it works</Button>
            <Button variant="command">&gt; request a process review</Button>
            <Button variant="ghost">full engine index →</Button>
          </div>
          <p className="mt-4 font-mono text-tele text-dim max-w-[64ch]">
            <span className="text-amber">note:</span> primary CTAs on the site
            usually render as command prompts ($ show us the process) rather
            than buttons. the button variants cover forms and secondary
            placements.
          </p>
        </Section>

        <Section title="readout panel">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <TerminalPanel title="process_supreme" lines={demoLines} />
            <table className="w-full text-left bg-panel border border-line rounded-inset">
              <tbody>
                {terminalRoles.map((r) => (
                  <tr key={r.role} className="border-b border-line last:border-b-0">
                    <td className="py-2.5 px-4 font-mono text-tele text-fg">{r.role}</td>
                    <td className="py-2.5 px-4 text-body-sm text-mute">{r.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="glyphs">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
            {([
              "reporting", "sync", "inventory", "margin", "purchasing",
              "labor", "compliance", "intake", "billing", "executive",
              "bonus", "diagnose", "build", "run",
            ] as GlyphName[]).map((name) => (
              <div key={name} className="bg-panel border border-line rounded-inset p-4 flex flex-col items-center gap-3">
                <Glyph name={name} className="w-9 h-9 text-fg" />
                <p className="font-mono text-tele-sm text-dim">{name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-tele text-dim max-w-[70ch]">
            <span className="text-amber">note:</span> three layers per glyph:
            depth edge in deep steel, detail linework in steel, exactly one
            amber signal. structure strokes inherit the text color.
          </p>
        </Section>

        <Section title="atmosphere">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="relative rounded-panel border border-line overflow-hidden min-h-[260px]">
              <LiquidField className="absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 font-mono text-tele-sm uppercase text-dim bg-deck/60">
                ui/LiquidField.tsx · molten amber + steel rim · pauses offscreen, settles under reduced motion
              </div>
            </div>
            <div className="relative rounded-panel overflow-hidden aurora border border-line p-6 flex flex-col justify-between gap-6">
              <div className="glass rounded-inset p-5 font-mono text-tele text-mute">
                <span className="text-amber">.glass</span> panel: translucent
                graphite, backdrop blur, inner top light
              </div>
              <p className="font-mono text-tele-sm uppercase text-dim">
                .aurora · faint amber light field for glass sections
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

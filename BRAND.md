# Process Supreme — Brand Brief

This is the source of truth for the Process Supreme website. Load it every session. If anything in docs/ or an older prompt file conflicts with this, this wins, and flag the conflict.

## What we are

Process Supreme builds custom software that cuts operational fat out of a business. Manual work, spreadsheets that don't talk, reports built by hand, work a machine should be doing, data nobody trusts. The product is subtraction. We find the drag in an operation and build the exact tool that removes it.

## The range is the proof

From automating one report to rebuilding an entire back office. Some clients need one thing fixed. Others need their whole operation rebuilt. Both are us.

## Voice and credibility

Built by operators, for operators. We have run the businesses we build for, so we are not a software company guessing at the problem. Keep that line on the site. Tone is plain, blunt, confident. Short sentences.

Messaging rules (June 2026):
- Outcome-first, second person. Every section must pass: does an operator reading it think "that's me" or "I want that."
- Plain English comes before brand vocabulary. A visitor should understand the business without knowing what an engine, integration, or automation is. Lead with familiar work: copying data between systems, rebuilding reports, purchasing from spreadsheets, compliance filing, and other recurring jobs. Define an engine only after the visitor understands the job it replaces: custom software that takes one recurring operational job from raw inputs to finished output and runs it automatically.
- Quantify in money AND time wherever truthful. Hours are abstract; dollars land. Recovered-hours claims carry a dollar figure or range beside them, at $35/hr loaded cost, labeled "typical, from real builds."
- No negations of our own claims, no inside baseball. Never reference our own history, pivots, or old framings in marketing copy (the About origin story is the one sanctioned exception).
- Engines are prescriptions, not products. "Engine" stays as brand vocabulary, but an engine is only ever introduced as the answer to a diagnosed pain. The drag check is the mechanism; /engines pairs every engine with its symptom and typical recovery.
- Proof stays concrete and honest: example demos labeled "example data," deployment figures labeled as our own operation, never a promise of the visitor's results. Never invent numbers.

## On AI

We do not lead with "AI." We build working software. AI is a tool we reach for when it is the right one, never the pitch. While everyone else is shouting about AI, we are the calm, competent ones who ship things that work.

## Proof, not identity

Our deepest work is in cannabis retail and cultivation: one of the most regulated, margin-thin, operationally painful categories there is. Purchasing intelligence, real-time weeks-of-supply, a cost-per-pound cultivation engine, automated compliance reporting. Frame it as "we made hard-mode lean," not as "we are a cannabis company." It belongs on a case study page, not in the hero or nav.

## The name stays

Process Supreme is about process, not weed. It travels to any industry. Keep the name and the `run process_supreme` wordmark.

## Design (Flight Deck, June 2026)

The page is an instrument panel, not a landing page. Direction name: Flight Deck. The cockpit of your operation: dark, calm, every number legible at a glance.

Palette (all values in `website/src/styles/tokens.ts`, nothing hardcoded in components):
- Surfaces: cool matte graphite. `deck` #121316 page, `well` #0D0E10 recessed boards, `panel` #17191D raised panels, `panel-up` #1C1F24. Hairlines `line` #2A2D33 / `line-bright` #3D424B.
- Text: `fg` #E9EAEC, `mute` #9BA1AB, `dim` #787F8A (labels and telemetry only).
- Two accents with a strict hierarchy. Primary: phosphor amber #E8A33D (`amber-bright` hover #F2BC66, `amber-deep` structural #8A6324) — the instrument voice: live data, signals, commands, headlines' key words. Secondary: steel #7FB2C9 (`steel-deep` #3A5564) — the cool counterpoint. The rule: steel marks structure and dormant states, amber marks live signals. Steel lives in: glyph depth edges and detail linework, the glass rim light, dormant switch and severity states (they turn amber when flipped), demo table column headers, section handoff links (amber on hover), ruler and rail tick marks, the wordmark's "run", and footer command prefixes. Steel is always quieter than amber and never carries meaning alone. Status colors are sparing: `ok` #9FD08C for settled lines, `alert` #E2705C for critical faults only, never decoration.
- Glyphs are three-layer instruments: structure strokes in currentColor (rows dim and light them), detail linework always steel, exactly one amber signal element per glyph (the tick, the needle, the flagged bar).

Type: Archivo for everything except data. Display is extrabold with tight tracking (-0.02 to -0.03em). Body is regular Archivo. JetBrains Mono carries telemetry, readouts, operator notes, commands, and the `run process_supreme` wordmark (run=dim, process=amber, _supreme=fg). Instrument numerals always tabular (`.tabular`).

Theme rule (June 2026, supersedes the cockpit framing): the site looks like the software we build, speaks plain operator English, and carries exactly one metaphor: fat, drag, engines. No second metaphor on top, ever. The instrument look stays (panels, hairlines, amber data, mono, switches); the costume vocabulary is dead.

Banned vocabulary, user-facing, all pages (so the costume never comes back): flight deck, flight recorder, pre-flight, final approach, cockpit, evidence deck, fault index, procedure, station/STN, sector, armed, scanning, playback, T+ timestamps, "all systems nominal", drag scan, "log:" prefixes, rec, telemetry-speak of any kind, and the "//" divider in section eyebrows. Eyebrows are plain English in the mono style ("The problem, priced", "Watch an engine run", "How deep an engine goes", "How it works", "Our own numbers", "Is this you?", "One clear action"). F-01 style codes are allowed only inside the drag check panel, where they read as diagnostic output (the product, not a costume). One easter egg survives: "PS, we love you" in the footer.

Layout language (the part that must not regress): no "headline left, card right" heroes. No copy-left/list-right splits as default rhythm. No three-equal-card rows. No two adjacent sections sharing a grid. As shipped: a minimal one-panel hero (headline at full contrast within 300ms, command-bar CTA); a thin operating-record strip; a plain-English before/after section that shows recognizable work before it defines "engine"; the merged "problem, priced" board (nine switchable symptom rows with severity bars, live readout, result log); the three live demos in one tabbed frame; the purchasing_intelligence spotlight; the concrete Find the drag/Build the first engine/Put it to work engagement rail; the "our own numbers" band with big numerals; the fit checklist; the terse CTA. Every section ends with exactly one mono handoff line into the next. A persistent ruler-tick rail runs down the left page edge (PageRuler) so the page reads as one instrument.

Hardware: small radii only (panel 6px, inset 4px, hard 2px). Corners get crosshair registration marks, not rounded softness. Page-edge and rail tick marks are a recurring detail.

Atmosphere layer (June 2026): the liquid glass treatment. A WebGL field (`ui/LiquidField.tsx`, ogl) of molten amber ribbons in graphite smoke runs under the hero panel and the proof band: band-pass ridges so it reads as flowing silk filaments, never solid blobs, and never any color outside the brand palette (no purple, ever). It renders at reduced resolution, pauses offscreen, and freezes to a settled frame under prefers-reduced-motion. Console frames and the contact panel use the `.glass` utility (translucent graphite, backdrop blur, inner top light); `.aurora` provides faint amber light fields behind glass sections. Glass is always paired with a dark wash so text stays AA. Iconography: custom instrument glyphs (`ui/Glyph.tsx`, 24px grid, 1.5px strokes, currentColor), one per engine plus diagnose/build/run; used in board rows, demo and lever tabs, prescription rows, and station labels. No stock icon sets for brand-level marks.

Craft rules (June 2026):
- Never-empty panel: a demo screen is never blank. First paint is the completed state; replays dim persisted content to ~55% and type over it; the pause between passes holds the full state. A screenshot at any random moment shows a panel at least two-thirds populated.
- Odometer convention: rolling numerals (`ui/OdometerNumber.tsx`) appear only where a number carries the story — the drag check live totals and result sum, the proof band outcomes, the purchasing deployment stats. Numbers that move are numbers that matter; nowhere else.
- Tactility budget: interaction polish concentrates on the drag check and nowhere else — spring rockers, the single 300ms amber flag sweep, staggered severity fills, the quiet glow on read result. Other surfaces stay calm.
- Performance over polish: anything on the first-paint path is CSS-only (hero settle, route fade). The liquid field is desktop-only. The Archivo width axis was tested and rejected (+45KB critical path).
- Brand surface assets: `src/app/icon.svg` (amber dot on graphite, scheme-aware), `favicon.ico`, `apple-icon.png` (PS mark), `public/og/*.png` (1200x630 share cards per route in the Flight Deck language, regenerate via headless browser when copy changes).

Motion: instrumentation, not theater. Content is legible the instant it enters the viewport; motion decorates, never reveals. Nothing renders below 90% opacity as its initial state: reveals slide, tint, or glow, they do not hide. All loops respect prefers-reduced-motion by settling to final state. CTAs read as commands ($ show us the process you hate, with a blinking cursor), not button pairs. Inside demo panels the data lines are the brightest text, brighter than the chrome labels around them.

Demos: all live demos are chrome-less screens that dock into console frames. They stay real animated components with clearly labeled example data. No GIFs, no screenshots.

The drag check (homepage, replaces engines-as-catalog): a diagnostic instrument, never called an audit. Nine yes/no rocker switches, all visible at once, data-driven from `src/data/dragCheck.ts` (the single source for switches, /engines prescriptions, and the contact prefill). A live readout prices flagged faults in hours and dollars; "read result" renders a terminal log with per-fault prescriptions, a composite drag estimate (margin, freed cash, and compliance time listed but excluded from the weekly sum), the $35/hr methodology footnote, an evidence link into the live demos, and a CTA that carries the flagged ids to /contact?dc=... where the form prefills in plain language. Tone: findings, not flattery.

The purchasing_intelligence spotlight (homepage, after the drag check; also the spine of /proof): the anatomy-of-an-engine exhibit. One console frame, five tabbed live vignettes (po_builder with visible math, cash_split urgent vs deferred, payment_terms from days-on-shelf with float exposure, power_rankings S–D grades, dead_capital priced with actions), plus a deployment proof strip labeled "from a live deployment." Always industry-neutral on the homepage: products, suppliers, stores. The cannabis context lives only on /proof.

Do not soften this into generic minimal SaaS, and do not let new sections regress to the eyebrow/headline/sub/two-buttons skeleton.

## Hard copy rules

- Never use emdashes. Use periods, commas, colons, or parentheses.
- Banned in user-facing copy: leverage, synergy, AI-powered, revolutionary, cutting-edge, harness, unlock, seamless.
- Sentence case for body. The existing uppercase mono eyebrow is a deliberate brand element and stays.

## Taglines

- Primary: Cut the fat out of how your business runs.
- Short: Cut the fat.
- Positioning line: We build the engine your operation is missing.

import Link from "next/link";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";

const operatingRecord = [
  { value: "15+", label: "years operating" },
  { value: "7", label: "locations run" },
  { value: "$50M+", label: "revenue managed" },
  { value: "0", label: "compliance violations" },
];

const examples = [
  {
    id: "01",
    glyph: "reporting" as GlyphName,
    name: "Daily reporting",
    before: "Managers combine numbers from several systems every morning.",
    after: "The finished report arrives automatically before the workday starts.",
  },
  {
    id: "02",
    glyph: "purchasing" as GlyphName,
    name: "Purchasing",
    before: "Buyers work through exports and spreadsheets, deciding quantities by instinct.",
    after: "Suggested orders are calculated from sales, inventory, lead times, and available cash.",
  },
  {
    id: "03",
    glyph: "sync" as GlyphName,
    name: "Disconnected systems",
    before: "Employees copy the same information between tools, and the totals still disagree.",
    after: "Information moves automatically and every system works from the same numbers.",
  },
  {
    id: "04",
    glyph: "compliance" as GlyphName,
    name: "Compliance",
    before: "Filing means days of gathering, formatting, checking, and rechecking data.",
    after: "The required report is generated from source data in the regulator's format.",
  },
];

export function WorkExamples() {
  return (
    <section id="what-we-automate" className="scroll-mt-14">
      <div className="border-y border-line bg-well">
        <div className="max-w-container mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 font-mono">
          {operatingRecord.map((item) => (
            <span key={item.label} className="flex items-baseline gap-2.5 text-tele-sm uppercase">
              <span className="text-amber tabular text-tele font-medium">{item.value}</span>
              <span className="text-dim">{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-10 py-band">
        <p className="font-mono text-tele-sm uppercase text-amber mb-3">
          What this looks like in a real business
        </p>
        <h2 className="font-display text-section text-fg max-w-[24ch]">
          If your team does it the same way every week, we can probably make it{" "}
          <span className="text-amber">run itself.</span>
        </h2>
        <p className="mt-5 text-body text-mute max-w-[66ch]">
          We usually do not replace the software you already use. We connect it,
          fill the gaps between it, and build the operational tool your business
          is missing.
        </p>

        <div className="mt-10 border-t border-line">
          {examples.map((example) => (
            <div
              key={example.id}
              className="py-6 border-b border-line grid md:grid-cols-[64px_220px_1fr] gap-x-7 gap-y-4"
            >
              <span className="font-mono text-tele text-steel flex items-start gap-2 md:block">
                <span>{example.id}</span>
                <Glyph name={example.glyph} className="w-6 h-6 mt-2 text-mute" />
              </span>
              <h3 className="font-display font-bold text-[1.05rem] tracking-[-0.01em] text-fg">
                {example.name}
              </h3>
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 font-mono text-tele leading-[1.8]">
                <p>
                  <span className="block text-tele-sm uppercase text-dim mb-1">Before</span>
                  <span className="text-mute">{example.before}</span>
                </p>
                <p className="sm:border-l sm:border-line sm:pl-8">
                  <span className="block text-tele-sm uppercase text-amber mb-1">After</span>
                  <span className="text-fg">{example.after}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-[52rem] border-l-2 border-amber-deep pl-6">
          <p className="text-body text-fg">
            We call each finished system an <span className="text-amber">engine</span>. An engine takes one
            recurring operational job, from raw inputs to finished output, and runs it automatically.
          </p>
          <p className="mt-3 font-mono text-tele text-mute">
            It can start with one report, one workflow, or one expensive decision.{" "}
            <Link
              href="/engines"
              className="text-steel underline underline-offset-4 decoration-steel-deep hover:text-amber hover:decoration-amber transition-colors"
            >
              See what else we automate →
            </Link>
          </p>
        </div>

        <p className="mt-7 font-mono text-tele">
          <a href="#drag-check" className="text-steel hover:text-amber transition-colors">
            recognize your week? price the drag ↓
          </a>
        </p>
      </div>
    </section>
  );
}

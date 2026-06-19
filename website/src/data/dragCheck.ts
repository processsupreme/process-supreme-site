/**
 * The drag check: nine yes/no switches, each a diagnosed pain with the
 * engine that removes it and a typical recovery. Single source of truth
 * for the homepage panel, the /engines prescriptions page, and the
 * contact prefill.
 *
 * Dollar figures assume a $35/hr loaded labor cost and are labeled
 * "typical, from real builds" in the UI. Never presented as a quote.
 */

export const LOADED_RATE = 35;
const WEEKS = 52;

export type FaultId =
  | "F-01" | "F-02" | "F-03" | "F-04" | "F-05"
  | "F-06" | "F-07" | "F-08" | "F-09";

/** Faults whose recovery is not weekly labor and sit outside the sum. */
export type AltKind = "margin" | "cash" | "compliance";

export interface DragFault {
  id: FaultId;
  /** mono switch label */
  switchLabel: string;
  /** severity 1-5, rendered as bars on the board */
  sev: number;
  /** the symptom, second person: the question the switch asks */
  symptom: string;
  /** engine name, mono */
  engine: string;
  /** the prescription one-liner */
  prescription: string;
  /** weekly recovered hours range; included in the composite sum */
  weeklyHours?: [number, number];
  /** appended after the dollar figure, names recovery beyond labor */
  plus?: string;
  /** non-weekly recovery: display line + what it actually is */
  alt?: { line: string; kind: AltKind };
  /** matching live evidence: demo channel or the purchasing spotlight */
  evidence?: "report" | "margin" | "inventory" | "purchasing";
}

export const dragFaults: DragFault[] = [
  {
    id: "F-01",
    sev: 5,
    switchLabel: "manual_reporting",
    symptom: "Someone on your team builds the same report by hand, every day.",
    engine: "reporting_engine",
    prescription: "the report builds and delivers itself before anyone walks in.",
    weeklyHours: [5, 15],
    evidence: "report",
  },
  {
    id: "F-02",
    sev: 4,
    switchLabel: "disconnected_systems",
    symptom: "Your tools don't talk. People re-key data between them, and the totals still don't match.",
    engine: "sync_engine",
    prescription: "your systems connected, one set of numbers everyone trusts.",
    weeklyHours: [4, 10],
  },
  {
    id: "F-03",
    sev: 4,
    switchLabel: "inventory_by_gut",
    symptom: "Stockouts surprise you. So does overstock.",
    engine: "inventory_engine",
    prescription: "live weeks-of-supply, reorders drafted before the shelf goes empty.",
    weeklyHours: [3, 8],
    plus: "plus the sales a stockout never loses",
    evidence: "inventory",
  },
  {
    id: "F-04",
    sev: 5,
    switchLabel: "margin_blind",
    symptom: "You know what sells. You don't know what makes money.",
    engine: "margin_engine",
    prescription: "true cost and true margin on every item, vendor, and location.",
    alt: { line: "1–3 points of margin on affected lines", kind: "margin" },
    evidence: "margin",
  },
  {
    id: "F-05",
    sev: 5,
    switchLabel: "purchasing_blind",
    symptom: "You buy on gut, your cash sits on the shelf, and you negotiate vendor terms blind.",
    engine: "purchasing_engine",
    prescription: "every order sized by sell-through, payment terms backed by data, suppliers graded by what they earn you.",
    alt: { line: "five to six figures of cash freed from shelves and float", kind: "cash" },
    evidence: "purchasing",
  },
  {
    id: "F-06",
    sev: 3,
    switchLabel: "schedule_guesswork",
    symptom: "Schedules come from memory. Overtime creeps. The busy hours run short-staffed.",
    engine: "labor_engine",
    prescription: "labor matched to demand instead of guesswork.",
    weeklyHours: [2, 6],
    plus: "plus the overtime that stops creeping",
  },
  {
    id: "F-07",
    sev: 4,
    switchLabel: "compliance_drag",
    symptom: "Regulator paperwork eats days every month, and one error is expensive.",
    engine: "compliance_engine",
    prescription: "the reports regulators want, generated automatically, audit-ready always.",
    alt: {
      line: "5–20 hrs/mo ≈ $2K–$8K/yr, plus the violation that never happens",
      kind: "compliance",
    },
  },
  {
    id: "F-08",
    sev: 3,
    switchLabel: "intake_shuffle",
    symptom: "Bringing on a customer, vendor, or hire means forms, email chains, and chasing.",
    engine: "intake_engine",
    prescription: "one clean flow from first contact to done.",
    weeklyHours: [2, 6],
  },
  {
    id: "F-09",
    sev: 4,
    switchLabel: "books_behind",
    symptom: "Invoices go out by hand and your accounting system is always behind.",
    engine: "billing_engine",
    prescription: "invoices generated, payments tracked, synced straight into QuickBooks or whatever you run.",
    weeklyHours: [3, 10],
    plus: "plus faster collections",
  },
];

/** Evidence priority when several faults are flagged. */
export const evidencePriority: FaultId[] = [
  "F-05", "F-01", "F-03", "F-04", "F-02", "F-06", "F-07", "F-08", "F-09",
];

/* ------------------------------------------------------------------ */
/* Math                                                                */
/* ------------------------------------------------------------------ */

export function yearlyDollars(hours: [number, number]): [number, number] {
  return [hours[0] * LOADED_RATE * WEEKS, hours[1] * LOADED_RATE * WEEKS];
}

export function fmtK(n: number): string {
  return `$${Math.round(n / 1000)}K`;
}

/** "5–15 hrs/wk ≈ $9K–$27K/yr" for weekly faults. */
export function recoveryLine(fault: DragFault): string {
  if (fault.alt) return fault.alt.line;
  if (!fault.weeklyHours) return "";
  const [d0, d1] = yearlyDollars(fault.weeklyHours);
  const base = `${fault.weeklyHours[0]}–${fault.weeklyHours[1]} hrs/wk ≈ ${fmtK(d0)}–${fmtK(d1)}/yr`;
  return fault.plus ? `${base}, ${fault.plus}` : base;
}

export interface DragSummary {
  flagged: DragFault[];
  hours: [number, number];
  dollars: [number, number];
  /** flagged alt kinds, in display order */
  altKinds: AltKind[];
}

export function summarize(flaggedIds: FaultId[]): DragSummary {
  const flagged = dragFaults.filter((f) => flaggedIds.includes(f.id));
  let h0 = 0, h1 = 0, d0 = 0, d1 = 0;
  const altKinds: AltKind[] = [];
  for (const f of flagged) {
    if (f.weeklyHours) {
      const [y0, y1] = yearlyDollars(f.weeklyHours);
      h0 += f.weeklyHours[0];
      h1 += f.weeklyHours[1];
      d0 += y0;
      d1 += y1;
    } else if (f.alt && !altKinds.includes(f.alt.kind)) {
      altKinds.push(f.alt.kind);
    }
  }
  return { flagged, hours: [h0, h1], dollars: [d0, d1], altKinds };
}

export const altKindLabels: Record<AltKind, string> = {
  margin: "margin",
  cash: "freed cash",
  compliance: "compliance time",
};

/** Plain-language phrases for the /contact prefill. */
export const prefillPhrases: Record<FaultId, string> = {
  "F-01": "the same report gets built by hand every day",
  "F-02": "our tools don't talk and people re-key data",
  "F-03": "stockouts and overstock keep surprising us",
  "F-04": "we know what sells but not what makes money",
  "F-05": "we buy on gut and our cash sits on the shelf",
  "F-06": "schedules are guesswork and overtime creeps",
  "F-07": "regulator paperwork eats days every month",
  "F-08": "bringing anyone on means forms and chasing",
  "F-09": "invoicing is manual and the books run behind",
};

/** "F-01" → "F01" for the query string, and back. */
export function toParam(ids: FaultId[]): string {
  return ids.map((id) => id.replace("-", "")).join(",");
}

export function fromParam(param: string | null): FaultId[] {
  if (!param) return [];
  const valid = new Set(dragFaults.map((f) => f.id));
  return param
    .split(",")
    .map((s) => s.trim().toUpperCase().replace(/^F(\d{2})$/, "F-$1"))
    .filter((s): s is FaultId => valid.has(s as FaultId));
}

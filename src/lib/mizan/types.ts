// ---------------------------------------------------------------------------
// Mizan Islamic Finance Diagnostic — Core Types
// ---------------------------------------------------------------------------

/** The medium-of-exchange path that determines which ribawi rules apply. */
export type MediumPath = "classical" | "fiat-classical" | "fiat";

/** Top-level diagnostic category identifiers. */
export type CategoryId =
  | "finance"
  | "invest"
  | "trade"
  | "personal"
  | "currency"
  | "crypto";

// ---------------------------------------------------------------------------
// Question / Option primitives
// ---------------------------------------------------------------------------

export interface SubType {
  id: string;
  name: string;
  desc: string;
}

/** Mapping from a weight key to its numeric score. */
export interface WeightMap {
  [key: string]: number;
}

/** A single selectable answer within a question. */
export interface Option {
  label: string;
  sub: string;
  val: string;
  w: WeightMap;
}

/** A diagnostic question shown during a specific phase. */
export interface Question {
  phase: number;
  text: string;
  plain: string;
  principle: string;
  opts: Option[];
}

// ---------------------------------------------------------------------------
// Results / Findings
// ---------------------------------------------------------------------------

/** One row in the human-readable summary table. */
export interface SummaryItem {
  q: string;
  a: string;
  val: string;
}

/**
 * Finding severity:
 *  f = fatal / fail
 *  w = warning
 *  p = pass
 *  i = informational
 */
export type FindingType = "f" | "w" | "p" | "i";

/** A single diagnostic finding produced by the engine. */
export interface Finding {
  t: FindingType;
  label: string;
  text: string;
  src?: string;
}

// ---------------------------------------------------------------------------
// Ribawi grid
// ---------------------------------------------------------------------------

export interface RibawiItem {
  name: string;
  ar: string;
  fiat: string;
  crypto_b: string;
  crypto_a: string;
  commodity: string;
  [key: string]: string;
}

export interface RibawiGrid {
  items: RibawiItem[];
  activeCol: string;
}

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------

export type VerdictClass = "pass" | "warn" | "fail" | "rev";

export interface Verdict {
  cls: VerdictClass;
  stamp: string;
  title: string;
  body: string;
  track: "classical" | "fiat";
}

export interface VerdictResult {
  verdict: Verdict;
  findings: Finding[];
  summary: SummaryItem[];
  ribawiGrid: RibawiGrid | null;
  medium: string;
  entryPath: string;
  isPersonalFiat: boolean;
}

// ---------------------------------------------------------------------------
// Categories & Phases
// ---------------------------------------------------------------------------

export interface Category {
  id: CategoryId;
  icon: string;
  name: string;
  hint: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "finance",
    icon: "\u{1F3E6}",
    name: "Finance & lending",
    hint: "Mortgages, home finance, personal finance, business loans, IFI products",
  },
  {
    id: "invest",
    icon: "\u{1F4C8}",
    name: "Investment",
    hint: "Stocks, funds, Sukuk, crypto, partnership, equity",
  },
  {
    id: "trade",
    icon: "\u{1F91D}",
    name: "Trade & exchange",
    hint: "Buying/selling goods, currency, crypto-as-exchange, business sales",
  },
  {
    id: "personal",
    icon: "\u{1F464}",
    name: "Personal loan or gift",
    hint: "Lending to family or friends, Qard Hasan, personal help",
  },
  {
    id: "currency",
    icon: "\u{1F4B1}",
    name: "Currency & money exchange",
    hint: "Forex, currency trading, money changers, remittance",
  },
  {
    id: "crypto",
    icon: "\u{20BF}",
    name: "Crypto & digital assets",
    hint: "Bitcoin, Ethereum, stablecoins, DeFi, NFTs, tokenized assets",
  },
];

export const PHASE_NAMES: string[] = [
  "What is the structure?",
  "What changed hands?",
  "The outstanding obligation (Dayn)",
  "Ribawi characteristics test",
  "The Hila / subterfuge test",
  "Gharar (uncertainty) assessment",
  "Maysir (gambling) assessment",
  "The Maqasid check",
];

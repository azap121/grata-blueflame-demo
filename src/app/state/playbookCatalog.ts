// The curated playbook catalog — ~18 real Skills/Blueprints from the July 2026
// Blueflame recon, collapsed to one concept (Playbook) and faceted per 8.2:
// Stage (primary) · Seat · Output · Cadence · Scope. The library is the fallback;
// contextual surfacing (the `/` menu, arrival offers) is the front door.

// The four verbs — Spencer's home vocabulary adopted as the canonical stage
// facet (page 11 decision): Evaluate folds into Diligence, Valuation & IC into
// Deal Execution, Monitor into Research.
export type PlaybookStage = 'Source' | 'Diligence' | 'Research' | 'Deal Execution';
export type PlaybookSeat = 'PE' | 'IB' | 'Credit' | 'IR' | 'Corp Dev';
export type PlaybookOutput = 'Table' | 'Memo' | 'Deck' | 'Model' | 'List' | 'Email' | 'Extraction';
export type PlaybookCadence = 'On demand' | 'Scheduled' | 'Event-triggered';

export interface Playbook {
  id: string;
  /** Verbatim skill/blueprint name from the recon. */
  name: string;
  /** Outcome-first description — what you get, not what it does. */
  outcome: string;
  stage: PlaybookStage;
  seats: PlaybookSeat[];
  output: PlaybookOutput;
  cadence: PlaybookCadence;
  scope: 'Personal' | 'Firm' | 'Blueflame';
  credits: number;
  /** Prepared prompt staged into the composer on select (never auto-sent). */
  prompt: string;
  /** Contextual-surfacing rationale, shown as a mono "why" chip when recommended. */
  why?: string;
}

export const PLAYBOOK_CATALOG: Playbook[] = [
  // ── Source ──────────────────────────────────────────────────────────────────
  {
    id: 'sourcing',
    name: 'sourcing',
    outcome: 'Build a sourced company list from a thesis',
    stage: 'Source',
    seats: ['PE', 'Corp Dev'],
    output: 'List',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 8,
    prompt: 'Source companies matching the Caldera thesis: HVAC services, Texas, $10M–$50M revenue, founder-owned.',
    why: 'because your search carried 40 companies forward',
  },
  {
    id: 'theme-pursuit',
    name: 'theme-pursuit',
    outcome: 'Turn an investment theme into a tracked market map',
    stage: 'Source',
    seats: ['PE'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 12,
    prompt: 'Build a market map for residential HVAC consolidation in the Southwest, tiered by fit.',
  },
  {
    id: 'grata-sourcing-similar',
    name: 'Grata Sourcing off Similar Companies',
    outcome: 'Expand a shortlist with lookalikes from the Grata graph',
    stage: 'Source',
    seats: ['PE', 'Corp Dev', 'IB'],
    output: 'List',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 6,
    prompt: '@Grata find companies similar to GulfAir Mechanical and rank by thesis fit.',
  },
  {
    id: 'addons-platform',
    name: 'Add-Ons for Platform Companies',
    outcome: 'Add-on candidates for a platform, scored and cited',
    stage: 'Source',
    seats: ['PE'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 10,
    prompt: 'Find add-on candidates for the Meridian Group platform in adjacent service lines.',
  },
  {
    id: 'lookalike-sourcing',
    name: 'ir-lookalike-sourcing',
    outcome: 'Lookalike LPs and buyers from your best relationships',
    stage: 'Source',
    seats: ['IR', 'IB'],
    output: 'List',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 7,
    prompt: 'Build a lookalike list from our three strongest LP relationships for the next raise.',
  },
  // ── Evaluate ────────────────────────────────────────────────────────────────
  {
    id: 'pe-cim-screen',
    name: 'cim-screen',
    outcome: 'Screen a CIM against your thesis, every cell cited',
    stage: 'Diligence',
    seats: ['PE'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 14,
    prompt: 'Run pe-cim-screen on the latest CIM upload and summarize fit against the Project Caldera thesis. Hold for my approval before anything runs.',
    why: 'because a CIM landed in Documents',
  },
  {
    id: 'cim-merits-risks',
    name: 'pc-cim-merits-risks',
    outcome: 'Merits & risks memo from a CIM, provenance-tagged',
    stage: 'Diligence',
    seats: ['PE', 'Credit'],
    output: 'Memo',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 11,
    prompt: 'Draft a merits and risks memo from the GulfAir Mechanical CIM with provenance tags on every claim.',
    why: 'because a CIM landed in Documents',
  },
  {
    id: 'public-comps-analysis',
    name: 'ib-public-comps-analysis',
    outcome: 'Public comps table with multiples and footnoted sources',
    stage: 'Diligence',
    seats: ['IB', 'PE'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 9,
    prompt: 'Build a public comps table for residential HVAC services companies with EV/EBITDA and revenue multiples.',
  },
  {
    id: 'cohort-analysis',
    name: 'pe-cohort-analysis',
    outcome: 'Customer cohort and retention analysis from raw exports',
    stage: 'Diligence',
    seats: ['PE'],
    output: 'Model',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 13,
    prompt: 'Run a cohort analysis on the customer export in Documents and flag concentration against the thesis cap.',
  },
  // ── Diligence ───────────────────────────────────────────────────────────────
  {
    id: 'diligence-qa-tracker',
    name: 'diligence-qa-tracker',
    outcome: 'Live Q&A tracker resolving every answer to a cited source',
    stage: 'Diligence',
    seats: ['PE', 'IB'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 10,
    prompt: 'Set up a diligence Q&A tracker for Project Caldera from a question sheet and the document corpus, resolving each answer to a cited source.',
  },
  {
    id: 'gap-analysis',
    name: 'ib-gap-analysis',
    outcome: 'What is missing from the data room, by workstream',
    stage: 'Diligence',
    seats: ['IB', 'PE'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 8,
    prompt: 'Run a gap analysis on the Caldera document corpus against the standard buy-side diligence checklist.',
    why: 'because the project moved to Diligence',
  },
  {
    id: 'workbook-audit',
    name: 'pe-workbook-audit',
    outcome: 'Excel workbook audited with [BF AUDIT] comments dropped in place',
    stage: 'Diligence',
    seats: ['PE'],
    output: 'Extraction',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 12,
    prompt: 'Audit the operating model workbook in Documents and drop audit comments on every hardcoded or inconsistent cell.',
  },
  {
    id: 'vdr-diligence-question-sheet',
    name: 'VDR Diligence Against Question Sheet',
    outcome: 'Question sheet answered from the corpus — ≤300 words, source, page, status per row',
    stage: 'Diligence',
    seats: ['PE', 'IB'],
    output: 'Table',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 16,
    prompt: 'Answer the diligence question sheet against the full Caldera corpus with source file, page, and status per question.',
  },
  // ── Valuation & IC ──────────────────────────────────────────────────────────
  {
    id: 'lbo-citations',
    name: 'pe-lbo-citations',
    outcome: 'LBO with every assumption provenance-tagged [SOURCE/DERIVED/ASSUMPTION]',
    stage: 'Deal Execution',
    seats: ['PE'],
    output: 'Model',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 18,
    prompt: 'Build a provenance-tagged LBO for GulfAir Mechanical from the CIM screen output and cohort analysis.',
  },
  {
    id: 'dcf-builder',
    name: 'ib-dcf-builder',
    outcome: 'DCF built from the corpus with stated assumptions',
    stage: 'Deal Execution',
    seats: ['IB', 'PE'],
    output: 'Model',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 15,
    prompt: 'Build a DCF for GulfAir Mechanical from management projections in Documents; state every assumption.',
  },
  {
    id: 'ic-memo',
    name: 'pe-ic-memo',
    outcome: 'IC memo drafted from the deal record, cited throughout',
    stage: 'Deal Execution',
    seats: ['PE'],
    output: 'Memo',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 14,
    prompt: 'Draft the investment-committee memo for Project Caldera from the screen, cohort analysis, and thesis notes.',
  },
  {
    id: 'board-slide',
    name: 'pe-board-slide',
    outcome: 'Board-ready slide from the latest deal state',
    stage: 'Deal Execution',
    seats: ['PE', 'Corp Dev'],
    output: 'Deck',
    cadence: 'On demand',
    scope: 'Blueflame',
    credits: 9,
    prompt: 'Draft the board update slide for Project Caldera — status, risks, next gates.',
  },
  // ── Monitor (scheduled → Runs) ──────────────────────────────────────────────
  {
    id: 'morning-meeting-prep',
    name: 'Morning Meeting Prep',
    outcome: 'Daily 7:55 digest of everything that moved, delivered to Chat',
    stage: 'Research',
    seats: ['PE', 'IB', 'Corp Dev'],
    output: 'Memo',
    cadence: 'Scheduled',
    scope: 'Firm',
    credits: 4,
    prompt: 'Schedule Morning Meeting Prep for 7:55 each weekday, delivered to Chat.',
  },
  {
    id: 'portco-news',
    name: 'PortCo News',
    outcome: 'Portfolio-company news swept and summarized on schedule',
    stage: 'Research',
    seats: ['PE', 'IR'],
    output: 'Memo',
    cadence: 'Scheduled',
    scope: 'Firm',
    credits: 3,
    prompt: 'Schedule a PortCo news sweep for the Meridian Group portfolio, weekdays at 07:30.',
  },
  {
    id: 'seller-intent-watch',
    name: 'Seller-intent watch',
    outcome: 'Signal fires when a watchlist company shows seller intent',
    stage: 'Research',
    seats: ['PE', 'Corp Dev'],
    output: 'List',
    cadence: 'Event-triggered',
    scope: 'Firm',
    credits: 2,
    prompt: 'Watch the HVAC Texas watchlist for seller-intent signals and surface fires in Runs.',
  },
];

export const PLAYBOOK_STAGES: PlaybookStage[] = ['Source', 'Diligence', 'Research', 'Deal Execution'];

// Contextual surfacing: recommended-first ordering for the `/` menu.
// On the home (Universe scope) the origination set leads; inside a project the
// evaluate/diligence set leads, with `why` chips carrying the rationale.
export function playbooksForContext(ctx: { inDeal: boolean }): Playbook[] {
  const recommendedIds = ctx.inDeal
    ? ['pe-cim-screen', 'cim-merits-risks', 'gap-analysis', 'grata-sourcing-similar']
    : ['sourcing', 'theme-pursuit', 'grata-sourcing-similar', 'seller-intent-watch'];
  const recommended = recommendedIds
    .map((id) => PLAYBOOK_CATALOG.find((playbook) => playbook.id === id))
    .filter((playbook): playbook is Playbook => Boolean(playbook));
  const rest = PLAYBOOK_CATALOG.filter((playbook) => !recommendedIds.includes(playbook.id));
  return [...recommended, ...rest];
}


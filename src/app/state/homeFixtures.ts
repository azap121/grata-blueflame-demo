// Attention-layer fixtures for the two-zone home (Zone 2).
// Needs you = blocked-on-me across every project; Overnight = what happened
// while you weren't looking. Both are scripted state, like everything else here.

export interface NeedsYouItem {
  id: string;
  icon: 'gate' | 'qa' | 'review';
  title: string;
  project: string;
  cta: string;
}

export interface OvernightItem {
  id: string;
  kind: 'run-finished' | 'signal' | 'doc-landed';
  title: string;
  project: string;
  timestamp: string;
}

export const NEEDS_YOU: NeedsYouItem[] = [
  {
    id: 'ny-1',
    icon: 'gate',
    title: 'CIM screen plan awaiting your approval',
    project: 'Project Caldera',
    cta: 'Review plan',
  },
  {
    id: 'ny-2',
    icon: 'review',
    title: 'Cited review table ready — 1 row flagged',
    project: 'Project Caldera',
    cta: 'Open review',
  },
  {
    id: 'ny-3',
    icon: 'qa',
    title: 'Two diligence questions waiting on you',
    project: 'Project Meridian',
    cta: 'Answer',
  },
];

export const OVERNIGHT: OvernightItem[] = [
  {
    id: 'on-1',
    kind: 'run-finished',
    title: 'Buyer list build finished — 34 candidates',
    project: 'Project Meridian',
    timestamp: '02:14',
  },
  {
    id: 'on-2',
    kind: 'signal',
    title: 'Seller-intent signal fired · GulfAir Mechanical',
    project: 'HVAC Texas watchlist',
    timestamp: '05:40',
  },
  {
    id: 'on-3',
    kind: 'run-finished',
    title: 'Morning Meeting Prep delivered',
    project: 'Scheduled · 07:55',
    timestamp: '07:55',
  },
];

// ── The four verbs (Spencer's home vocabulary, page 11) ──────────────────────
// Each chip expands an inline suggestion panel; Source suggestions run the
// Grata search flow, the rest open a Merlin chat.

export interface HomeVerbSuggestion {
  label: string;
  kind: 'sourcing' | 'ask';
}

export interface HomeVerb {
  id: string;
  label: string;
  icon: 'source' | 'diligence' | 'research' | 'execution';
  suggestions: HomeVerbSuggestion[];
}

export const HOME_VERBS: HomeVerb[] = [
  {
    id: 'source',
    label: 'Source',
    icon: 'source',
    suggestions: [
      { label: 'Find bootstrapped SaaS companies with $5–20M revenue', kind: 'sourcing' },
      { label: 'Build a target list of HVAC roll-up candidates in the Southeast', kind: 'sourcing' },
      { label: 'Surface founder-owned manufacturers nearing succession', kind: 'sourcing' },
      { label: 'Find companies similar to one of my portfolio companies', kind: 'sourcing' },
      { label: 'Identify add-on acquisitions for my platform investment', kind: 'sourcing' },
    ],
  },
  {
    id: 'diligence',
    label: 'Diligence',
    icon: 'diligence',
    suggestions: [
      { label: `Summarize a target's competitive landscape`, kind: 'ask' },
      { label: 'Analyze revenue growth and headcount trends', kind: 'ask' },
      { label: 'Flag customer concentration and churn risks', kind: 'ask' },
      { label: 'Build a management team background report', kind: 'ask' },
      { label: 'Benchmark the target against industry peers', kind: 'ask' },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    icon: 'research',
    suggestions: [
      { label: 'Map the market landscape for a sector', kind: 'ask' },
      { label: 'Size the total addressable market for a vertical', kind: 'ask' },
      { label: 'Track recent M&A activity and deals in a space', kind: 'ask' },
      { label: 'Identify consolidation trends and active acquirers', kind: 'ask' },
      { label: 'Build an investment thesis for a subsector', kind: 'ask' },
    ],
  },
  {
    id: 'execution',
    label: 'Deal Execution',
    icon: 'execution',
    suggestions: [
      { label: 'Draft the IC memo from the deal record', kind: 'ask' },
      { label: 'Build the LBO with cited assumptions', kind: 'ask' },
      { label: 'Prepare the board update slide', kind: 'ask' },
      { label: 'Draft outreach emails to shortlisted targets', kind: 'ask' },
      { label: 'Assemble the closing checklist', kind: 'ask' },
    ],
  },
];

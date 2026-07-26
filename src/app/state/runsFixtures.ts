// Runs — the surface that makes deferred and scheduled work real (8.2 Part C).
// Blueflame's scheduled Blueprints deliver to email; Grata's Autopilot delivers to
// a feed. Merged, they are one concept: a Run you can hold, watch, pause, share.
// "Needs you" first — the highest-value screen in the platform.

export type RunSection = 'needs-you' | 'running' | 'scheduled' | 'recent';

export interface RunStep {
  label: string;
  done: boolean;
  /** Marks the federation beat — an @Grata tool call inside a run. */
  grataCall?: boolean;
}

export interface RunRow {
  id: string;
  playbookId: string;
  title: string;
  project: string;
  section: RunSection;
  /** Human state line, e.g. 'Awaiting plan approval', 'Executing · step 3/7'. */
  state: string;
  /** Mono metadata line: credits, dial, schedule, delivery. */
  meta: string;
  dial: 'Guide me' | 'Plan first' | 'Draft ahead' | 'Run it' | 'Sandbox';
  steps?: RunStep[];
  /** Audit stamp shown in the detail drawer for completed runs. */
  audit?: string;
}

export const RUN_ROWS: RunRow[] = [
  // ── Needs you ───────────────────────────────────────────────────────────────
  {
    id: 'run-cim-gate',
    playbookId: 'pe-cim-screen',
    title: 'CIM screen — plan awaiting your approval',
    project: 'Project Caldera',
    section: 'needs-you',
    state: 'Awaiting plan approval',
    meta: 'est. 14 credits · Plan first',
    dial: 'Plan first',
    steps: [
      { label: 'Read the CIM (74 pages)', done: true },
      { label: 'Load the Caldera thesis and screen criteria', done: true },
      { label: 'Draft the screening plan', done: true },
      { label: 'Plan gate — waiting on you', done: false },
    ],
  },
  {
    id: 'run-review-ready',
    playbookId: 'cohort-analysis',
    title: 'Cohort analysis — review ready, 1 row flagged',
    project: 'Project Meridian',
    section: 'needs-you',
    state: 'Review ready',
    meta: '11 credits · Draft ahead · commit gate open',
    dial: 'Draft ahead',
    steps: [
      { label: 'Parse the customer export', done: true },
      { label: 'Build 12-quarter cohort grid', done: true },
      { label: 'Flag concentration vs thesis cap', done: true },
      { label: 'Commit gate — waiting on you', done: false },
    ],
  },
  // ── Running ─────────────────────────────────────────────────────────────────
  {
    id: 'run-buyer-list',
    playbookId: 'sourcing',
    title: 'Buyer list build',
    project: 'Project Meridian',
    section: 'running',
    state: 'Executing · step 3 of 5',
    meta: '6 of est. 9 credits · Run it',
    dial: 'Run it',
    steps: [
      { label: 'Load the mandate profile', done: true },
      { label: 'Screen strategic acquirers by fit', done: true },
      { label: 'Enrich candidates with intent signals', done: false, grataCall: true },
      { label: 'Rank and tier the list', done: false },
      { label: 'Draft the outreach sheet', done: false },
    ],
  },
  // ── Scheduled ───────────────────────────────────────────────────────────────
  {
    id: 'run-morning-prep',
    playbookId: 'morning-meeting-prep',
    title: 'Morning Meeting Prep',
    project: 'All projects',
    section: 'scheduled',
    state: 'Scheduled',
    meta: 'weekdays 07:55 · delivers to Chat',
    dial: 'Run it',
  },
  {
    id: 'run-portco-news',
    playbookId: 'portco-news',
    title: 'PortCo News sweep',
    project: 'Portfolio — Meridian Group',
    section: 'scheduled',
    state: 'Scheduled',
    meta: 'weekdays 07:30 · delivers to Chat',
    dial: 'Run it',
  },
  {
    id: 'run-seller-intent',
    playbookId: 'seller-intent-watch',
    title: 'Seller-intent watch',
    project: 'HVAC Texas watchlist',
    section: 'scheduled',
    state: 'Watching · 40 companies',
    meta: 'event-triggered · fires into Needs you',
    dial: 'Run it',
  },
  // ── Recent ──────────────────────────────────────────────────────────────────
  {
    id: 'run-buyer-list-done',
    playbookId: 'sourcing',
    title: 'Buyer list build — 34 candidates',
    project: 'Project Meridian',
    section: 'recent',
    state: 'Committed 02:14',
    meta: '9 credits · Run it',
    dial: 'Run it',
    audit: 'Ran in Run it · committed at the send gate by Alex Verma',
  },
  {
    id: 'run-signal-fired',
    playbookId: 'seller-intent-watch',
    title: 'Seller-intent signal · GulfAir Mechanical',
    project: 'HVAC Texas watchlist',
    section: 'recent',
    state: 'Fired 05:40',
    meta: 'score 68 · owner-transition signal',
    dial: 'Run it',
    audit: 'Event-triggered · surfaced to Needs you and Overnight',
  },
  {
    id: 'run-morning-done',
    playbookId: 'morning-meeting-prep',
    title: 'Morning Meeting Prep — delivered',
    project: 'All projects',
    section: 'recent',
    state: 'Delivered 07:55',
    meta: '4 credits · scheduled',
    dial: 'Run it',
    audit: 'Scheduled run · delivered to Chat',
  },
];

export const RUN_SECTIONS: Array<{ id: RunSection; label: string; blurb: string }> = [
  { id: 'needs-you', label: 'Needs you', blurb: 'Plan gates, checkpoints, and reviews blocked on you — across every project' },
  { id: 'running', label: 'Running', blurb: 'In flight now, with budget consumed' },
  { id: 'scheduled', label: 'Scheduled', blurb: 'Recurring playbooks and signal watches' },
  { id: 'recent', label: 'Recent', blurb: 'Completed, with outputs and where they landed' },
];

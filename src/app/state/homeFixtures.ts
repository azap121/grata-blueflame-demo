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

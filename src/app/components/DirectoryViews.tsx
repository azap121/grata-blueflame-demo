// The Grata mirror — Business Development and Market Research destinations, plus
// Files and Pipeline. Customers navigate by these names (page 11: "mirror the
// map, keep the engine"); underneath they are all views over the same objects:
// Companies/Buyers/Bankers → Entity roles, Lists → saved sets, Deals →
// Transactions. Fixture pages here; the Companies table itself is the live
// sourcing flow.
import { faArrowUpRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { grataTeal, monoFontFamily, moondust } from '~/theme/grata/theme';

export type DirectoryId =
  | 'files'
  | 'pipeline'
  | 'list-library'
  | 'buyers'
  | 'bankers'
  | 'conferences'
  | 'live-deals'
  | 'markets'
  | 'market-index'
  | 'deals';

interface DirectoryRow {
  title: string;
  meta: string;
  tag?: string;
}

interface DirectoryFixture {
  title: string;
  subtitle: string;
  /** Which object this destination really is — the model note, rendered small. */
  objectNote: string;
  rows: DirectoryRow[];
}

const DIRECTORY_FIXTURES: Record<DirectoryId, DirectoryFixture> = {
  files: {
    title: 'Files',
    subtitle: 'One corpus — uploads, generated outputs, and connected drives.',
    objectNote: 'Document · smart Collections are views, not folders',
    rows: [
      { title: 'GulfAir Mechanical — CIM (74 pages)', meta: 'Space · Caldera · uploaded 2d ago', tag: 'CIM' },
      { title: 'Caldera thesis.md', meta: 'Space · Caldera · Space context', tag: 'Note' },
      { title: 'Customer export FY23–FY25.xlsx', meta: 'Space · Caldera · processing complete', tag: 'Data' },
      { title: 'CIM Screen — GulfAir (cited table)', meta: 'Generated · tracked to Review', tag: 'Artifact' },
      { title: 'Meridian quarterly pack Q2.pdf', meta: 'Portfolio — Meridian Group', tag: 'Report' },
    ],
  },
  pipeline: {
    title: 'Pipeline',
    subtitle: 'Every space on the gradient — Watchlist → Target → Live Deal → Portfolio.',
    objectNote: 'Space type is a gradient; promotion carries context forward',
    rows: [
      { title: 'HVAC Texas watchlist', meta: '40 companies · 2 signals fired', tag: 'Watchlist' },
      { title: 'Project Caldera', meta: '3 targets · CIM screen tracked', tag: 'Live Deal' },
      { title: 'Project Halley', meta: 'IC pre-read due Friday', tag: 'Target' },
      { title: 'Project Njord', meta: 'DD 9/14 workstreams', tag: 'Live Deal' },
      { title: 'Meridian Group', meta: 'Quarterly pack refreshed', tag: 'Portfolio' },
    ],
  },
  'list-library': {
    title: 'List Library',
    subtitle: 'Saved company sets — yours and the firm’s.',
    objectNote: 'Saved Entity sets · the low end of the Space gradient',
    rows: [
      { title: 'TX HVAC $10–50M', meta: '40 companies · seller-intent on', tag: 'Mine' },
      { title: 'Founder-owned industrials', meta: '128 companies · updated weekly', tag: 'Firm' },
      { title: 'Vertical SaaS screen', meta: '67 companies', tag: 'Firm' },
      { title: 'Board game manufacturing', meta: '23 companies · from Spencer’s demo', tag: 'Mine' },
    ],
  },
  buyers: {
    title: 'Buyers',
    subtitle: 'Acquirers active in your space, ranked by fit and activity.',
    objectNote: 'Entity · role: buyer — one graph, scoped view',
    rows: [
      { title: 'Comfort Systems USA', meta: '12 HVAC acquisitions · last close Mar 2026', tag: 'Strategic' },
      { title: 'Sila Services (Goldman MBD)', meta: 'Platform · 8 add-ons', tag: 'Sponsor' },
      { title: 'Apex Service Partners', meta: 'Aggressive TX expansion', tag: 'Sponsor' },
      { title: 'Lennox International', meta: 'Selective · distribution focus', tag: 'Strategic' },
    ],
  },
  bankers: {
    title: 'Bankers',
    subtitle: 'Advisors running processes in your markets.',
    objectNote: 'Entity · role: banker',
    rows: [
      { title: 'Harris Williams — Industrials', meta: '9 HVAC processes in 24 months', tag: 'Active' },
      { title: 'Baird — Services', meta: '4 processes · mid-market', tag: 'Active' },
      { title: 'Generational Equity', meta: 'Founder-owned specialists', tag: 'Watch' },
    ],
  },
  conferences: {
    title: 'Conferences',
    subtitle: 'Where your targets and buyers will be next.',
    objectNote: 'Entity · type: event',
    rows: [
      { title: 'AHR Expo 2027', meta: 'Chicago · Feb 2027 · 14 watchlist companies attending', tag: 'HVAC' },
      { title: 'ACG DealMAX', meta: 'Las Vegas · May 2027', tag: 'M&A' },
      { title: 'SMACNA Annual', meta: 'Palm Desert · Oct 2026', tag: 'HVAC' },
    ],
  },
  'live-deals': {
    title: 'Live Deals',
    subtitle: 'Processes in market from the banker network.',
    objectNote: 'Space · type: Live Deal, sourced from the network',
    rows: [
      { title: 'Project Gulfstream — HVAC services, TX', meta: 'Harris Williams · CIM out · fits thesis', tag: 'New' },
      { title: 'Project Cascade — plumbing roll-up', meta: 'Baird · management meetings', tag: 'Round 2' },
      { title: 'Project Ember — fire & safety', meta: 'Piper Sandler · IOIs due 14 Aug', tag: 'Active' },
    ],
  },
  markets: {
    title: 'Markets',
    subtitle: 'Market maps and landscapes you’re tracking.',
    objectNote: 'Research spaces over the Entity graph',
    rows: [
      { title: 'US Residential HVAC Services', meta: '2,340 companies · consolidation accelerating', tag: 'Tracked' },
      { title: 'Commercial Mechanical — Southwest', meta: '890 companies', tag: 'Tracked' },
      { title: 'Building Controls & Automation', meta: '1,120 companies · thesis draft', tag: 'Draft' },
    ],
  },
  'market-index': {
    title: 'Market Index',
    subtitle: 'Sector performance across the graph.',
    objectNote: 'Aggregates over Entity fundamentals',
    rows: [
      { title: 'HVAC Services Index', meta: '+11.2% TTM · multiples 7.1–8.4x EBITDA', tag: '▲' },
      { title: 'Vertical SaaS Index', meta: '+6.8% TTM', tag: '▲' },
      { title: 'Industrial Distribution', meta: '-2.1% TTM', tag: '▼' },
    ],
  },
  deals: {
    title: 'Deals',
    subtitle: 'Precedent transactions — comps for pricing and structure.',
    objectNote: 'Transaction — renamed from Grata "Deals" to break the collision with live deals',
    rows: [
      { title: 'TX roll-up platform ← Sila Services', meta: 'Jul 2026 · ~7.5x EBITDA', tag: 'Comp' },
      { title: 'GulfCoast Mechanical ← Comfort Systems', meta: 'Mar 2026 · undisclosed', tag: 'Comp' },
      { title: 'Southwest Climate ← Apex', meta: 'Jan 2026 · ~6.9x EBITDA', tag: 'Comp' },
    ],
  },
};

export default function DirectoryView({ id }: { id: DirectoryId }) {
  const fixture = DIRECTORY_FIXTURES[id];
  return (
    <Box sx={{ height: '100%', minHeight: 0, overflowY: 'auto', bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 980, mx: 'auto', px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 400, color: 'text.primary', mb: 0.25 }}>
          {fixture.title}
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary' }}>{fixture.subtitle}</Typography>
        <Typography sx={{ fontFamily: monoFontFamily, fontSize: 10.5, color: moondust[400], mb: 3, mt: 0.5 }}>
          {fixture.objectNote}
        </Typography>
        <Stack
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}
          divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}
        >
          {fixture.rows.map((row) => (
            <Stack
              key={row.title}
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ px: 1.75, py: 1.25, '&:hover': { bgcolor: alpha(grataTeal, 0.06) }, cursor: 'pointer' }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: 'text.primary' }} noWrap>
                  {row.title}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{row.meta}</Typography>
              </Box>
              {row.tag && (
                <Box
                  component="span"
                  sx={{
                    px: 0.7,
                    py: 0.2,
                    borderRadius: '4px',
                    bgcolor: 'background.defaultAlt',
                    border: '1px solid',
                    borderColor: 'divider',
                    fontFamily: monoFontFamily,
                    fontSize: 10,
                    color: 'text.secondary',
                  }}
                >
                  {row.tag}
                </Box>
              )}
              <FontAwesomeIcon icon={faArrowUpRight} style={{ fontSize: 10, color: moondust[400] }} />
            </Stack>
          ))}
        </Stack>
        <Typography sx={{ fontSize: 11.5, color: 'text.disabled', mt: 1.5 }}>
          Fixture destination — the live table behind this lives in the Companies search flow.
        </Typography>
      </Box>
    </Box>
  );
}

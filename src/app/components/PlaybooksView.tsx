// Playbooks — the faceted library. The FALLBACK, not the front door: contextual
// surfacing (the `/` menu, arrival offers) finds the instrument for you; this is
// where you browse when surfacing fails. Stage is the primary facet (it maps to
// where the user actually is); Seat / Output / Cadence / Scope are filters.
import { useMemo, useState } from 'react';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { HaloButton } from '~/theme/grata/components';
import { grataTeal, monoFontFamily, moondust } from '~/theme/grata/theme';
import {
  PLAYBOOK_CATALOG,
  PLAYBOOK_STAGES,
  type Playbook,
  type PlaybookSeat,
} from '../state/playbookCatalog';

interface Props {
  onRun: (playbook: Playbook) => void;
  onCreate: () => void;
}

const SEATS: PlaybookSeat[] = ['PE', 'IB', 'Credit', 'IR', 'Corp Dev'];
const CADENCES = ['On demand', 'Scheduled', 'Event-triggered'] as const;

export default function PlaybooksView({ onRun, onCreate }: Props) {
  const [stage, setStage] = useState<string>('All');
  const [seat, setSeat] = useState<PlaybookSeat | null>(null);
  const [cadence, setCadence] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      PLAYBOOK_CATALOG.filter(
        (playbook) =>
          (stage === 'All' || playbook.stage === stage) &&
          (!seat || playbook.seats.includes(seat)) &&
          (!cadence || playbook.cadence === cadence)
      ),
    [stage, seat, cadence]
  );

  return (
    <Box sx={{ height: '100%', minHeight: 0, overflowY: 'auto', bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 1080, mx: 'auto', px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography component="h1" sx={{ fontSize: 24, fontWeight: 400, color: 'text.primary' }}>
            Playbooks
          </Typography>
          <HaloButton
            size="small"
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 11 }} />}
            onClick={onCreate}
            sx={{ textTransform: 'none' }}
          >
            Create playbook
          </HaloButton>
        </Stack>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', mb: 3 }}>
          Your firm's saved ways of doing things — one concept, {PLAYBOOK_CATALOG.length} in the library. Type{' '}
          <Box component="span" sx={{ fontFamily: monoFontFamily, fontSize: 12.5 }}>/</Box> in any composer to get the
          right one surfaced in context.
        </Typography>

        {/* Stage — the primary facet */}
        <Stack direction="row" spacing={0.75} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
          {['All', ...PLAYBOOK_STAGES].map((candidate) => (
            <FacetChip
              key={candidate}
              label={candidate}
              selected={stage === candidate}
              primary
              onClick={() => setStage(candidate)}
            />
          ))}
        </Stack>
        {/* Secondary facets */}
        <Stack direction="row" spacing={0.75} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
          {SEATS.map((candidate) => (
            <FacetChip
              key={candidate}
              label={candidate}
              selected={seat === candidate}
              onClick={() => setSeat(seat === candidate ? null : candidate)}
            />
          ))}
          <Box sx={{ width: 12 }} />
          {CADENCES.map((candidate) => (
            <FacetChip
              key={candidate}
              label={candidate}
              selected={cadence === candidate}
              onClick={() => setCadence(cadence === candidate ? null : candidate)}
            />
          ))}
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 1.5 }}>
          {filtered.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} onRun={() => onRun(playbook)} />
          ))}
        </Box>
        {filtered.length === 0 && (
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 2 }}>
            Nothing matches those facets — clear a filter.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function FacetChip({
  label,
  selected,
  primary = false,
  onClick,
}: {
  label: string;
  selected: boolean;
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        px: 1.2,
        py: 0.45,
        borderRadius: '999px',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: selected ? alpha(grataTeal, 0.15) : 'background.paper',
        color: selected ? 'text.primary' : 'text.secondary',
        fontSize: primary ? 12.5 : 11.5,
        fontWeight: selected ? 600 : 400,
        fontFamily: primary ? undefined : monoFontFamily,
      }}
    >
      {label}
    </ButtonBase>
  );
}

function PlaybookCard({ playbook, onRun }: { playbook: Playbook; onRun: () => void }) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 1.75,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        transition: 'border-color 160ms ease, box-shadow 160ms ease',
        '&:hover': { borderColor: moondust[400], boxShadow: `0 6px 18px ${alpha(moondust[900], 0.08)}` },
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary', lineHeight: 1.35 }}>
        {playbook.outcome}
      </Typography>
      <Typography sx={{ fontFamily: monoFontFamily, fontSize: 11, color: 'text.secondary' }}>
        {playbook.name} · {playbook.credits} cr
      </Typography>
      <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap sx={{ mt: 'auto', pt: 0.5 }}>
        <CardBadge label={playbook.stage} />
        <CardBadge label={playbook.output} />
        {playbook.cadence !== 'On demand' && <CardBadge label={playbook.cadence} />}
        <CardBadge label={playbook.scope} />
        <Box sx={{ flex: 1 }} />
        <ButtonBase
          onClick={onRun}
          sx={{ px: 1, py: 0.25, borderRadius: '6px', fontSize: 12, fontWeight: 600, color: 'primary.main' }}
        >
          Run →
        </ButtonBase>
      </Stack>
    </Box>
  );
}

function CardBadge({ label }: { label: string }) {
  return (
    <Box
      component="span"
      sx={{
        px: 0.6,
        py: 0.15,
        borderRadius: '4px',
        bgcolor: 'background.defaultAlt',
        border: '1px solid',
        borderColor: 'divider',
        fontFamily: monoFontFamily,
        fontSize: 10,
        color: 'text.secondary',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Box>
  );
}

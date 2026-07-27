// The `/` instrument menu — contextual playbook surfacing in the composer.
// One grammar across both layers: `/` picks the verb, `@` picks the material,
// the autonomy dial sets the trust level. Recommended entries lead (with a mono
// "why" chip); the stage-grouped catalog follows; the library is the fallback.
import { useEffect, useMemo, useRef } from 'react';
import { Box, Paper, Popper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { grataTeal, monoFontFamily, moondust } from '~/theme/grata/theme';
import {
  PLAYBOOK_STAGES,
  playbooksForContext,
  type Playbook,
} from '../state/playbookCatalog';

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  /** Text typed after the slash — type-ahead filter over name + outcome. */
  query: string;
  context: { inDeal: boolean };
  highlightIndex: number;
  onHighlightChange: (index: number) => void;
  onSelect: (playbook: Playbook) => void;
  onBrowseAll: () => void;
}

export interface SlashMenuRow {
  kind: 'playbook' | 'browse-all';
  playbook?: Playbook;
}

// Flat row list (recommended → stage groups → browse-all) so the composer's
// keyboard handler can drive highlight/select without knowing the grouping.
// This flat order IS the render order — highlight index and Enter agree by
// construction.
export function buildSlashMenuRows(query: string, context: { inDeal: boolean }): SlashMenuRow[] {
  const needle = query.trim().toLowerCase();
  const ordered = playbooksForContext(context);
  let list: Playbook[];
  if (needle) {
    list = ordered.filter(
      (playbook) =>
        playbook.name.toLowerCase().includes(needle) || playbook.outcome.toLowerCase().includes(needle)
    );
  } else {
    const recommended = ordered.slice(0, 4);
    const rest = ordered.slice(4);
    list = [...recommended, ...PLAYBOOK_STAGES.flatMap((stage) => rest.filter((playbook) => playbook.stage === stage))];
  }
  return [...list.map((playbook) => ({ kind: 'playbook' as const, playbook })), { kind: 'browse-all' as const }];
}

export default function SlashPlaybookMenu({
  open,
  anchorEl,
  query,
  context,
  highlightIndex,
  onHighlightChange,
  onSelect,
  onBrowseAll,
}: Props) {
  const rows = useMemo(() => buildSlashMenuRows(query, context), [query, context]);
  const recommendedCount = query.trim() ? 0 : 4;
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-highlighted="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightIndex]);

  if (!open || !anchorEl) return null;

  let renderedIndex = -1;
  const playbookRows = rows.filter((row) => row.kind === 'playbook');

  const renderRow = (row: SlashMenuRow) => {
    renderedIndex += 1;
    const index = renderedIndex;
    const highlighted = index === highlightIndex;
    if (row.kind === 'browse-all') {
      return (
        <Box
          key="browse-all"
          data-highlighted={highlighted ? 'true' : undefined}
          onMouseEnter={() => onHighlightChange(index)}
          onMouseDown={(event) => {
            event.preventDefault();
            onBrowseAll();
          }}
          sx={{
            px: 1.5,
            py: 1,
            cursor: 'pointer',
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: highlighted ? alpha(grataTeal, 0.14) : 'transparent',
          }}
        >
          <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: 'primary.main' }}>Browse all playbooks →</Typography>
        </Box>
      );
    }
    const playbook = row.playbook!;
    return (
      <Box
        key={playbook.id}
        data-highlighted={highlighted ? 'true' : undefined}
        onMouseEnter={() => onHighlightChange(index)}
        onMouseDown={(event) => {
          event.preventDefault();
          onSelect(playbook);
        }}
        sx={{
          px: 1.5,
          py: 0.9,
          cursor: 'pointer',
          bgcolor: highlighted ? alpha(grataTeal, 0.14) : 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ fontFamily: monoFontFamily, fontSize: 11.5, color: 'text.primary', fontWeight: 500 }}>
            {playbook.name}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', flex: 1 }} noWrap>
            {playbook.outcome}
          </Typography>
          {playbook.cadence !== 'On demand' && (
            <MetaChip label={playbook.cadence === 'Scheduled' ? 'scheduled' : 'event'} />
          )}
          <MetaChip label={`${playbook.credits} cr`} />
        </Stack>
        {index < recommendedCount && playbook.why && (
          <Typography sx={{ fontFamily: monoFontFamily, fontSize: 10.5, color: moondust[500] }}>
            {playbook.why}
          </Typography>
        )}
      </Box>
    );
  };

  // Render the flat list in order, inserting group labels where sections start.
  const labelBefore = (index: number): string | null => {
    if (query.trim()) return null;
    if (index === 0 && recommendedCount > 0) return 'Recommended';
    if (index < recommendedCount) return null;
    const row = playbookRows[index];
    const prev = playbookRows[index - 1];
    if (!row?.playbook) return null;
    if (index === recommendedCount) return row.playbook.stage;
    if (prev?.playbook && prev.playbook.stage !== row.playbook.stage) return row.playbook.stage;
    return null;
  };

  return (
    <Popper
      open
      anchorEl={anchorEl}
      placement="top-start"
      sx={{ zIndex: 1500 }}
      modifiers={[
        { name: 'preventOverflow', options: { padding: 12 } },
        { name: 'flip', options: { fallbackPlacements: ['bottom-start'] } },
      ]}
    >
      <Paper
        elevation={0}
        sx={{
          width: 520,
          maxHeight: 380,
          overflowY: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          boxShadow: `0 12px 32px ${alpha(moondust[900], 0.14)}`,
          mb: 1,
        }}
        ref={listRef}
      >
        {playbookRows.map((row, index) => {
          const label = labelBefore(index);
          return (
            <Box key={row.playbook!.id}>
              {label && <GroupLabel label={label} />}
              {renderRow(row)}
            </Box>
          );
        })}
        {playbookRows.length === 0 && (
          <Typography sx={{ px: 1.5, py: 1.5, fontSize: 12.5, color: 'text.secondary' }}>
            No playbooks match “{query}”.
          </Typography>
        )}
        {renderRow(rows[rows.length - 1])}
      </Paper>
    </Popper>
  );
}

function GroupLabel({ label }: { label: string }) {
  return (
    <Typography
      sx={{
        px: 1.5,
        pt: 1,
        pb: 0.25,
        fontFamily: monoFontFamily,
        fontSize: 10,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'text.secondary',
      }}
    >
      {label}
    </Typography>
  );
}

function MetaChip({ label }: { label: string }) {
  return (
    <Box
      component="span"
      sx={{
        px: 0.6,
        py: 0.1,
        borderRadius: '4px',
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

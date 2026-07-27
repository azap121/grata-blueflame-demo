// Runs — global surface, project-filterable. Four sections in spec order with
// "Needs you" first. Clicking a row opens a right drawer with the glass-box step
// trace (domain-language steps, @Grata badges, audit stamp).
import { useState } from 'react';
import { faBolt, faCheck, faChevronRight, faCirclePause, faSpinner, faXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { grataBlue, monoFontFamily, moondust } from '~/theme/grata/theme';
import { RUN_ROWS, RUN_SECTIONS, type RunRow } from '../state/runsFixtures';

interface Props {
  onOpenProject: (projectName: string) => void;
}

export default function RunsView({ onOpenProject }: Props) {
  const [openRun, setOpenRun] = useState<RunRow | null>(null);

  return (
    <Box sx={{ height: '100%', minHeight: 0, overflowY: 'auto', bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 980, mx: 'auto', px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 400, color: 'text.primary', mb: 0.5 }}>
          Runs
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', mb: 3.5 }}>
          Every agent execution — waiting, in flight, scheduled, and done. Deferred work lives here, not in your inbox.
        </Typography>

        <Stack spacing={3.5}>
          {RUN_SECTIONS.map((section) => {
            const rows = RUN_ROWS.filter((row) => row.section === section.id);
            if (rows.length === 0) return null;
            return (
              <Box key={section.id}>
                <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: monoFontFamily,
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: section.id === 'needs-you' ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {section.label} ({rows.length})
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: 'text.disabled' }}>{section.blurb}</Typography>
                </Stack>
                <Stack
                  sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}
                  divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}
                >
                  {rows.map((row) => (
                    <RunRowItem key={row.id} row={row} onOpen={() => setOpenRun(row)} />
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <RunDetailDrawer run={openRun} onClose={() => setOpenRun(null)} onOpenProject={onOpenProject} />
    </Box>
  );
}

function RunRowItem({ row, onOpen }: { row: RunRow; onOpen: () => void }) {
  const needsYou = row.section === 'needs-you';
  const running = row.section === 'running';
  return (
    <Stack
      component="button"
      type="button"
      onClick={onOpen}
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        px: 1.75,
        py: 1.25,
        textAlign: 'left',
        border: 0,
        font: 'inherit',
        bgcolor: 'background.paper',
        cursor: 'pointer',
        width: '100%',
        '&:hover': { bgcolor: 'background.defaultAlt' },
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          flexShrink: 0,
          bgcolor: needsYou ? grataBlue : running ? moondust[500] : moondust[300],
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: needsYou ? 600 : 400, color: 'text.primary' }} noWrap>
          {row.title}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{row.state}</Typography>
      </Box>
      <Typography sx={{ fontFamily: monoFontFamily, fontSize: 11, color: 'text.secondary', whiteSpace: 'nowrap' }}>
        {row.project}
      </Typography>
      <Typography sx={{ fontFamily: monoFontFamily, fontSize: 11, color: 'text.disabled', whiteSpace: 'nowrap' }}>
        {row.meta}
      </Typography>
      <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10, color: moondust[400] }} />
    </Stack>
  );
}

function RunDetailDrawer({
  run,
  onClose,
  onOpenProject,
}: {
  run: RunRow | null;
  onClose: () => void;
  onOpenProject: (projectName: string) => void;
}) {
  return (
    <Drawer anchor="right" open={Boolean(run)} onClose={onClose} PaperProps={{ sx: { width: 440, p: 3 } }}>
      {run && (
        <Stack spacing={2}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Typography sx={{ fontSize: 17, fontWeight: 500, color: 'text.primary', lineHeight: 1.3 }}>
                {run.title}
              </Typography>
              <Typography
                component="button"
                type="button"
                onClick={() => {
                  onClose();
                  onOpenProject(run.project);
                }}
                sx={{
                  fontFamily: monoFontFamily,
                  fontSize: 11.5,
                  color: 'primary.main',
                  border: 0,
                  bgcolor: 'transparent',
                  p: 0,
                  cursor: 'pointer',
                }}
              >
                {run.project} →
              </Typography>
            </Box>
            <IconButton size="small" onClick={onClose} aria-label="Close run detail">
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 14 }} />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1}>
            <DetailChip label={run.state} emphasized />
            <DetailChip label={run.meta} />
            <DetailChip label={run.dial} />
          </Stack>

          {run.steps && (
            <Box>
              <Typography
                sx={{
                  fontFamily: monoFontFamily,
                  fontSize: 10.5,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mb: 1,
                }}
              >
                Step trace
              </Typography>
              <Stack spacing={0.9}>
                {run.steps.map((step) => (
                  <Stack key={step.label} direction="row" alignItems="center" spacing={1.1}>
                    <FontAwesomeIcon
                      icon={step.done ? faCheck : step.grataCall ? faBolt : run.section === 'running' ? faSpinner : faCirclePause}
                      style={{ fontSize: 11, color: step.done ? moondust[500] : grataBlue, width: 14 }}
                    />
                    <Typography sx={{ fontSize: 13, color: step.done ? 'text.secondary' : 'text.primary', flex: 1 }}>
                      {step.label}
                    </Typography>
                    {step.grataCall && (
                      <Box
                        component="span"
                        sx={{
                          px: 0.6,
                          borderRadius: '4px',
                          bgcolor: alpha(grataBlue, 0.08),
                          fontFamily: monoFontFamily,
                          fontSize: 10,
                          color: grataBlue,
                        }}
                      >
                        @Grata
                      </Box>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          {run.audit && (
            <Box
              sx={{
                px: 1.5,
                py: 1.1,
                borderRadius: 2,
                bgcolor: 'background.defaultAlt',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography sx={{ fontFamily: monoFontFamily, fontSize: 11, color: 'text.secondary' }}>
                {run.audit}
              </Typography>
            </Box>
          )}
        </Stack>
      )}
    </Drawer>
  );
}

function DetailChip({ label, emphasized = false }: { label: string; emphasized?: boolean }) {
  return (
    <Box
      component="span"
      sx={{
        px: 0.9,
        py: 0.35,
        borderRadius: '6px',
        border: '1px solid',
        borderColor: emphasized ? 'primary.main' : 'divider',
        color: emphasized ? 'primary.main' : 'text.secondary',
        fontFamily: monoFontFamily,
        fontSize: 10.5,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Box>
  );
}

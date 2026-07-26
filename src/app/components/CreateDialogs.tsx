// Create — the authoring flows. Two doors: capture from work ("Save as Playbook"
// on any run output — the real front door) and this blank-canvas path from the
// global + Create control. Everything is created Personal by default; publishing
// to Firm scope is a review gate, not a toggle — that's 8.2's authorship gap
// answered in the flow.
import { useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { HaloButton } from '~/theme/grata/components';
import { grataBlueInfo, grataBlueHover, monoFontFamily } from '~/theme/grata/theme';

export type CreateKind = 'project' | 'playbook' | 'agent';

// ── The + Create menu ─────────────────────────────────────────────────────────

export function CreateMenu({
  anchorEl,
  onPick,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onPick: (kind: CreateKind) => void;
  onClose: () => void;
}) {
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <MenuItem onClick={() => onPick('project')}>
        <Stack>
          <Typography sx={{ fontSize: 13.5 }}>Project</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Start from a search — promote targets into a workspace</Typography>
        </Stack>
      </MenuItem>
      <MenuItem onClick={() => onPick('playbook')}>
        <Stack>
          <Typography sx={{ fontSize: 13.5 }}>Playbook</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Teach the platform your firm's way of doing a thing</Typography>
        </Stack>
      </MenuItem>
      <MenuItem onClick={() => onPick('agent')}>
        <Stack>
          <Typography sx={{ fontSize: 13.5 }}>Agent</Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Author a governed executor — a contract, not a prompt</Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );
}

// ── Create Playbook ───────────────────────────────────────────────────────────

export interface PlaybookPrefill {
  name: string;
  inputs: string[];
  steps: string[];
}

export function CreatePlaybookDialog({
  open,
  prefill,
  onClose,
  onSaved,
}: {
  open: boolean;
  prefill?: PlaybookPrefill;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [name, setName] = useState('');
  const [inputs, setInputs] = useState('');
  const [steps, setSteps] = useState('');
  const [output, setOutput] = useState('Table');
  const [schedule, setSchedule] = useState('');
  const [scope, setScope] = useState<'Personal' | 'Firm'>('Personal');

  useEffect(() => {
    if (open) {
      setName(prefill?.name ?? '');
      setInputs(prefill ? prefill.inputs.join(', ') : '');
      setSteps(prefill ? prefill.steps.join('\n') : '');
      setOutput('Table');
      setSchedule('');
      setScope('Personal');
    }
  }, [open, prefill]);

  const save = () => {
    onSaved(
      scope === 'Firm'
        ? `${name || 'Playbook'} saved — queued for Firm review`
        : `${name || 'Playbook'} saved to your playbooks`
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3 }}>
        <DialogHeader
          title="Create Playbook"
          subtitle={prefill ? 'Captured from the run — edit and save' : 'A saved way of doing a thing'}
          onClose={onClose}
        />
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="caldera-cim-screen"
            InputProps={{ sx: { fontFamily: monoFontFamily, fontSize: 13 } }}
          />
          <TextField
            label="Typed inputs"
            size="small"
            value={inputs}
            onChange={(event) => setInputs(event.target.value)}
            placeholder="CIM document, Thesis"
            helperText="What the playbook needs before it can run — comma separated"
          />
          <TextField
            label="Steps"
            size="small"
            multiline
            minRows={3}
            value={steps}
            onChange={(event) => setSteps(event.target.value)}
            placeholder={'Read the CIM\nScreen against thesis criteria\nBuild the cited review table'}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Output"
              size="small"
              select
              value={output}
              onChange={(event) => setOutput(event.target.value)}
              sx={{ flex: 1 }}
              SelectProps={{ native: true }}
            >
              {['Table', 'Memo', 'Deck', 'Model', 'List', 'Email', 'Extraction'].map((candidate) => (
                <option key={candidate} value={candidate}>
                  {candidate}
                </option>
              ))}
            </TextField>
            <TextField
              label="Schedule (optional)"
              size="small"
              value={schedule}
              onChange={(event) => setSchedule(event.target.value)}
              placeholder="weekdays 07:55"
              sx={{ flex: 1 }}
            />
          </Stack>
          <ScopePicker scope={scope} onChange={setScope} />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <HaloButton variant="text" onClick={onClose} sx={{ textTransform: 'none' }}>
              Cancel
            </HaloButton>
            <HaloButton variant="contained" onClick={save} sx={{ textTransform: 'none' }}>
              {scope === 'Firm' ? 'Save & submit for review' : 'Save playbook'}
            </HaloButton>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

// ── Create Agent — authoring a contract ───────────────────────────────────────

export function CreateAgentDialog({
  open,
  onClose,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('50');
  const [approval, setApproval] = useState('Plan first');
  const [scope, setScope] = useState<'Personal' | 'Firm'>('Personal');

  useEffect(() => {
    if (open) {
      setName('');
      setBudget('50');
      setApproval('Plan first');
      setScope('Personal');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3 }}>
        <DialogHeader
          title="Create Agent"
          subtitle="An agent is a contract: identity, capabilities, approvals, budget"
          onClose={onClose}
        />
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Identity"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Diligence Support Agent"
          />
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.75 }}>
              Tools & capabilities — explicit grants, explicit denials
            </Typography>
            <Stack spacing={0.5}>
              {[
                { cap: 'corpus.list · doc.read', granted: true },
                { cap: 'clause.extract · citation.resolve', granted: true },
                { cap: 'table.write (proposals only)', granted: true },
                { cap: '@Grata search & enrich', granted: true },
                { cap: 'Financials — not granted · staged disclosure', granted: false },
              ].map((row) => (
                <Stack key={row.cap} direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: row.granted ? 'success.main' : 'error.main',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: monoFontFamily,
                      fontSize: 11.5,
                      color: row.granted ? 'text.primary' : 'text.secondary',
                    }}
                  >
                    {row.cap}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Approval default"
              size="small"
              select
              value={approval}
              onChange={(event) => setApproval(event.target.value)}
              sx={{ flex: 1 }}
              SelectProps={{ native: true }}
            >
              {['Guide me', 'Plan first', 'Draft ahead', 'Run it', 'Sandbox'].map((candidate) => (
                <option key={candidate} value={candidate}>
                  {candidate}
                </option>
              ))}
            </TextField>
            <TextField
              label="Budget cap (credits / run)"
              size="small"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              sx={{ flex: 1 }}
              InputProps={{ sx: { fontFamily: monoFontFamily, fontSize: 13 } }}
            />
          </Stack>
          <ScopePicker scope={scope} onChange={setScope} />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <HaloButton variant="text" onClick={onClose} sx={{ textTransform: 'none' }}>
              Cancel
            </HaloButton>
            <HaloButton
              variant="contained"
              onClick={() => {
                onSaved(
                  scope === 'Firm'
                    ? `${name || 'Agent'} contract saved — queued for Firm review`
                    : `${name || 'Agent'} contract saved (Personal)`
                );
                onClose();
              }}
              sx={{ textTransform: 'none' }}
            >
              {scope === 'Firm' ? 'Save & submit for review' : 'Save agent'}
            </HaloButton>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

// ── Shared pieces ─────────────────────────────────────────────────────────────

function DialogHeader({ title, subtitle, onClose }: { title: string; subtitle: string; onClose: () => void }) {
  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
      <Box>
        <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary' }}>{title}</Typography>
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>{subtitle}</Typography>
      </Box>
      <IconButton size="small" onClick={onClose} aria-label={`Close ${title}`}>
        <FontAwesomeIcon icon={faXmark} style={{ fontSize: 14 }} />
      </IconButton>
    </Stack>
  );
}

function ScopePicker({
  scope,
  onChange,
}: {
  scope: 'Personal' | 'Firm';
  onChange: (scope: 'Personal' | 'Firm') => void;
}) {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {(['Personal', 'Firm'] as const).map((candidate) => (
          <Stack
            key={candidate}
            direction="row"
            alignItems="center"
            spacing={0.5}
            onClick={() => onChange(candidate)}
            sx={{ cursor: 'pointer' }}
          >
            <Radio size="small" checked={scope === candidate} sx={{ p: 0.5 }} />
            <Typography sx={{ fontSize: 13 }}>{candidate}</Typography>
          </Stack>
        ))}
      </Stack>
      {scope === 'Firm' && (
        <Box sx={{ mt: 1, px: 1.5, py: 1, borderRadius: 2, bgcolor: grataBlueInfo }}>
          <Typography sx={{ fontSize: 12, color: grataBlueHover }}>
            Publishing to Firm scope requires review by a named approver before anyone else can run it.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

import {
  faBookOpenLines,
  faCommentsQuestion,

  faPenLine,
  faTableCells,
} from '@fortawesome/pro-light-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Stack, Typography } from '@mui/material';
import { HaloButton } from '~/theme/grata/components';
import ChatComposer from './ChatComposer';

import type { SeatId } from '../state/persona';
import type { Playbook } from '../state/playbookCatalog';

export type FullChatEmptyStateMode = 'chat' | 'skills' | 'templates';

const fadeUpEntranceSx = (delayMs: number, durationMs = 380) => ({
  opacity: 0,
  transform: 'translateY(10px)',
  animation: `emptyChatFadeUp ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1) ${delayMs}ms forwards`,
  '@keyframes emptyChatFadeUp': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    opacity: 1,
    transform: 'none',
    animation: 'none',
  },
});

interface Props {
  mode?: FullChatEmptyStateMode;
  composerValue: string;
  attachedFileIds: string[];
  attachedFolderIds: string[];
  composerLoading?: boolean;
  composerPlaceholder?: string;
  onComposerChange: (value: string) => void;
  onComposerSubmit: (value: string) => void;
  onContextChange: (context: { fileIds: string[]; folderIds: string[] }) => void;
  onSelectFolderPrompt: () => void;
  onSelectFilingPrompt: () => void;
  onSelectBriefPrompt: () => void;
  seat: SeatId;
  // Global chat contract: scope chip + `/` playbook menu (Universe/Firm context).
  scopeLabel?: string;
  slashContext?: { inDeal: boolean };
  onQueuePlaybook?: (playbook: Playbook) => void;
  onBrowsePlaybooks?: () => void;
}

export default function FullChatEmptyState({
  mode = 'chat',
  composerValue,
  attachedFileIds,
  attachedFolderIds,
  composerLoading = false,
  composerPlaceholder,
  onComposerChange,
  onComposerSubmit,
  onContextChange,
  onSelectFolderPrompt,
  onSelectFilingPrompt,
  onSelectBriefPrompt,
  seat,
  scopeLabel,
  slashContext,
  onQueuePlaybook,
  onBrowsePlaybooks,
}: Props) {
  const copy = getEmptyStateCopy(mode, seat);

  const handlePromptClick = (prompt: EmptyStatePrompt) => {
    if (prompt.action === 'select-folder') {
      onSelectFolderPrompt();
      return;
    }
    if (prompt.action === 'select-filing') {
      onSelectFilingPrompt();
      return;
    }
    if (prompt.action === 'select-brief') {
      onSelectBriefPrompt();
      return;
    }
    onComposerSubmit(prompt.prompt);
  };

  return (
    <Box
      sx={{
        height: '100%',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Stack spacing={2.5} alignItems="center" sx={{ width: 'min(780px, 100%)' }}>
        <Typography
          component="h1"
          sx={{
            fontSize: 24,
            fontWeight: 400,
            color: 'text.primary',
            textAlign: 'center',
            ...fadeUpEntranceSx(80),
          }}
        >
          {copy.title}
        </Typography>
        <Box sx={{ width: 'min(600px, 100%)', ...fadeUpEntranceSx(180, 420) }}>
          <ChatComposer
            large
            showPoweredLine={false}
            loading={composerLoading}
            value={composerValue}
            placeholder={composerPlaceholder}
            attachedFileIds={attachedFileIds}
            attachedFolderIds={attachedFolderIds}
            scopeLabel={scopeLabel}
            slashContext={slashContext}
            onQueuePlaybook={onQueuePlaybook}
            onBrowsePlaybooks={onBrowsePlaybooks}
            onChange={onComposerChange}
            onSubmit={onComposerSubmit}
            onContextChange={onContextChange}
          />
        </Box>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
          <Box sx={fadeUpEntranceSx(340, 340)}>
            <HaloButton
              size="small"
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={copy.prompts[0].icon} />}
              onClick={() => handlePromptClick(copy.prompts[0])}
              sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
            >
              {copy.prompts[0].label}
            </HaloButton>
          </Box>
          <Box sx={fadeUpEntranceSx(430, 340)}>
            <HaloButton
              size="small"
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={copy.prompts[1].icon} />}
              onClick={() => handlePromptClick(copy.prompts[1])}
              sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
            >
              {copy.prompts[1].label}
            </HaloButton>
          </Box>
          <Box sx={fadeUpEntranceSx(520, 340)}>
            <HaloButton
              size="small"
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={copy.prompts[2].icon} />}
              onClick={() => handlePromptClick(copy.prompts[2])}
              sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
            >
              {copy.prompts[2].label}
            </HaloButton>
          </Box>
          <Box sx={fadeUpEntranceSx(610, 340)}>
            <HaloButton
              size="small"
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={copy.prompts[3].icon} />}
              onClick={() => handlePromptClick(copy.prompts[3])}
              sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
            >
              {copy.prompts[3].label}
            </HaloButton>
          </Box>
        </Stack>
        <Typography
          variant="caption"
          sx={{ display: 'block', color: 'text.disabled', textAlign: 'center', ...fadeUpEntranceSx(720, 340) }}
        >
          {copy.footnote}
        </Typography>
      </Stack>
    </Box>
  );
}

type EmptyStatePrompt = {
  label: string;
  prompt: string;
  icon: IconDefinition;
  action?: 'select-folder' | 'select-filing' | 'select-brief';
};

function getEmptyStateCopy(mode: FullChatEmptyStateMode, _seat: SeatId): {
  title: string;
  footnote: string;
  prompts: EmptyStatePrompt[];
} {
  if (mode === 'skills') {
    return {
      title: 'What skill should Merlin build?',
      footnote: 'Describe the reusable workflow once. Merlin can draft the objective, inputs, checks, templates, and approval path.',
      prompts: [
        {
          label: 'Churn / NRR response',
          prompt: 'Build a reusable skill for finding support for churn and NRR claims that can be shared with Round 1 buyers.',
          icon: faBookOpenLines,
        },
        {
          label: 'Source-code disclosure',
          prompt: 'Build a reusable skill for reviewing source-code disclosure requests and routing restricted answers before buyer release.',
          icon: faCommentsQuestion,
        },
        {
          label: 'DPA evidence search',
          prompt: 'Build a reusable skill for finding DPA, SOC 2, and security evidence while flagging buyer-safe and restricted content.',
          icon: faTableCells,
        },
        {
          label: 'Round 1 answer drafting',
          prompt: 'Build a reusable skill for drafting Round 1 buyer answers with citations, disclosure checks, and approval checkpoints.',
          icon: faPenLine,
        },
      ],
    };
  }

  if (mode === 'templates') {
    return {
      title: 'What template should Merlin prepare?',
      footnote: 'Use firm playbooks and preferred output standards to ground the next agent workflow.',
      prompts: [
        {
          label: 'Q&A response template',
          prompt: 'Create a Q&A response template for cited buyer answers with disclosure status, owner, and approval notes.',
          icon: faBookOpenLines,
        },
        {
          label: 'Banker update format',
          prompt: 'Create a senior banker update template for search findings, unresolved risks, and next review actions.',
          icon: faCommentsQuestion,
        },
        {
          label: 'ARR diligence checklist',
          prompt: 'Create an ARR and churn diligence checklist template that agents can use when searching the room.',
          icon: faTableCells,
        },
        {
          label: 'Disclosure playbook',
          prompt: 'Create a Round 1 disclosure playbook template for permission checks, restricted files, and legal routing.',
          icon: faPenLine,
        },
      ],
    };
  }

  // GLOBAL chat — this empty state only renders outside a project (inside one,
  // the deal intro takes over). A chat started global stays global: firm-scoped
  // suggestions, no project vocabulary. Same set for both seats.
  return {
    title: 'What should we move forward today?',
    footnote: 'Merlin works firm-wide here — open a project to work its corpus, or type / for a playbook.',
    prompts: [
      {
        label: 'What changed across my projects?',
        prompt: 'What moved across my projects this week — signals, documents, and open questions? Make it a brief I could forward unedited.',
        icon: faCommentsQuestion,
      },
      {
        label: 'Which watchlist signals fired?',
        prompt: 'Which companies on my watchlists fired seller-intent signals this week, and what changed?',
        icon: faTableCells,
      },
      {
        label: 'Brief me for the pipeline call',
        prompt: 'Brief me for this morning\'s pipeline call — status, blockers, and the one decision each project needs.',
        icon: faBookOpenLines,
      },
      {
        label: 'Draft an IC pre-read outline',
        prompt: 'Draft an IC pre-read outline for Project Halley from its thesis and screening notes.',
        icon: faPenLine,
      },
    ],
  };
}

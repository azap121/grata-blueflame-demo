// Chats — the global chats list (Spencer's nav destination, our scope rules).
// Chats started here stay global; a Space's chats live inside the Space.
import { faMessagePlus, faMessages } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { HaloButton } from '~/theme/grata/components';
import { grataTeal, monoFontFamily, moondust } from '~/theme/grata/theme';
import type { RecentChat } from './AssistantPanel';

interface Props {
  chats: RecentChat[];
  onOpenChat: (sessionId: string) => void;
  onNewChat: () => void;
}

export default function ChatsView({ chats, onOpenChat, onNewChat }: Props) {
  return (
    <Box sx={{ height: '100%', minHeight: 0, overflowY: 'auto', bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 780, mx: 'auto', px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography component="h1" sx={{ fontSize: 24, fontWeight: 400, color: 'text.primary' }}>
            Chats
          </Typography>
          <HaloButton
            size="small"
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faMessagePlus} style={{ fontSize: 12 }} />}
            onClick={onNewChat}
            sx={{ textTransform: 'none' }}
          >
            New chat
          </HaloButton>
        </Stack>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', mb: 3 }}>
          Firm-scoped conversations with Merlin. Chats inside a Space stay with the Space.
        </Typography>

        {chats.length === 0 ? (
          <Stack alignItems="center" spacing={1.5} sx={{ py: 8 }}>
            <FontAwesomeIcon icon={faMessages} style={{ fontSize: 28, color: moondust[300] }} />
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
              No chats yet — start one, or ask anything from Home.
            </Typography>
            <HaloButton variant="outlined" size="small" onClick={onNewChat} sx={{ textTransform: 'none' }}>
              Start a chat
            </HaloButton>
          </Stack>
        ) : (
          <Stack
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}
            divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}
          >
            {chats.map((chat) => (
              <Stack
                key={chat.id}
                component="button"
                type="button"
                direction="row"
                alignItems="center"
                spacing={1.5}
                onClick={() => onOpenChat(chat.id)}
                sx={{
                  px: 1.75,
                  py: 1.25,
                  textAlign: 'left',
                  border: 0,
                  font: 'inherit',
                  bgcolor: 'background.paper',
                  cursor: 'pointer',
                  width: '100%',
                  '&:hover': { bgcolor: alpha(grataTeal, 0.06) },
                }}
              >
                <FontAwesomeIcon icon={faMessages} style={{ fontSize: 13, color: grataTeal }} />
                <Typography sx={{ fontSize: 13.5, color: 'text.primary', flex: 1 }} noWrap>
                  {chat.title}
                </Typography>
                <Typography sx={{ fontFamily: monoFontFamily, fontSize: 11, color: 'text.disabled' }}>
                  {chat.relativeTime}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

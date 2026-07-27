import { faCheck, faMoon, faSunBright } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  ButtonBase,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { HaloAvatar } from '~/theme/grata/components';
import { moondust } from '~/theme/grata/theme';
import { useThemeMode, type ThemeMode } from '~/theme/ThemeModeContext';

export interface ProfileSubscription {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface ProfileHelpItem {
  label: string;
  onClick?: () => void;
}

export interface ProfileMenuProps {
  user: { name: string; initials?: string; avatarUrl?: string };
  onClose?: () => void;
  onEditProfile?: () => void;
  subscriptions?: ProfileSubscription[];
  showViewAllSubscriptions?: boolean;
  onViewAllSubscriptions?: () => void;
  help?: ProfileHelpItem[];
  onSettings?: () => void;
  onLogOut?: () => void;
}

const defaultSubscriptions: ProfileSubscription[] = [
  { label: 'Deal Team', active: true },
  { label: 'Firm Leadership' },
];

const defaultHelp: ProfileHelpItem[] = [
  { label: 'Support Portal' },
  { label: 'Feedback' },
  { label: 'Legal' },
];

/**
 * Profile dropdown matching HALO_Nav_UserMenu (Figma node 25988:12098, April 2026).
 * Tokens: white bg, border rgba(25,25,25,0.12), borderRadius 4px, width 220px.
 * Render inside a Popper anchored to the avatar — positioning is the caller's responsibility.
 */
export function ProfileMenu({
  user,
  onClose,
  onEditProfile,
  subscriptions = defaultSubscriptions,
  showViewAllSubscriptions,
  onViewAllSubscriptions,
  help = defaultHelp,
  onSettings,
  onLogOut,
}: ProfileMenuProps) {
  const showViewAll = showViewAllSubscriptions ?? false;

  const handle = (cb?: () => void) => () => { onClose?.(); cb?.(); };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 220,
        pb: '8px',
        pt: '4px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
      }}>

      {/* User header — HaloAvatar large (48px) */}
      <Box sx={{ px: '16px', py: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <HaloAvatar src={user.avatarUrl} size="md" sx={{ flexShrink: 0 }}>
          {!user.avatarUrl && (user.initials ?? user.name.slice(0, 2).toUpperCase())}
        </HaloAvatar>
        <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
          <Typography
            variant="body2"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.name}
          </Typography>
          <MuiLink
            component="button"
            type="button"
            onClick={handle(onEditProfile)}
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              textDecoration: 'none',
              background: 'none',
              border: 0,
              p: 0,
              cursor: onEditProfile ? 'pointer' : 'default',
              '&:hover': onEditProfile ? { textDecoration: 'underline' } : {},
            }}>
            Edit profile
          </MuiLink>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'background.defaultAlt' }} />

      <ListSubheader disableSticky sx={{ bgcolor: 'transparent', lineHeight: '36px' }}>Subscriptions</ListSubheader>
      <List dense disablePadding>
        {subscriptions.map((sub) => (
          <ListItem key={sub.label} disablePadding>
            <ListItemButton onClick={handle(sub.onClick)} sx={{ px: '16px', py: '8px' }}>
              <ListItemText
                primary={sub.label}
                primaryTypographyProps={{ variant: 'body2' }}
              />
              {sub.active && (
                <Box sx={{ color: 'text.primary', fontSize: 14, flexShrink: 0 }}>
                  <FontAwesomeIcon icon={faCheck} />
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
        {showViewAll && (
          <ListItem disablePadding>
            <ListItemButton onClick={handle(onViewAllSubscriptions)} sx={{ px: '16px', py: '8px' }}>
              <ListItemText
                primary="View All"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider sx={{ borderColor: 'background.defaultAlt' }} />

      <ListSubheader disableSticky sx={{ bgcolor: 'transparent', lineHeight: '36px' }}>Help</ListSubheader>
      <List dense disablePadding>
        {help.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={handle(item.onClick)} sx={{ px: '16px', py: '8px' }}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'background.defaultAlt' }} />

      {/* Appearance — light/dark switcher. Doesn't close the menu, so the user
          sees the flip happen (cause → effect). */}
      <ListSubheader disableSticky sx={{ bgcolor: 'transparent', lineHeight: '36px' }}>Appearance</ListSubheader>
      <Box sx={{ px: '16px', pb: '8px' }}>
        <ThemeModeSwitch />
      </Box>

      <Divider sx={{ borderColor: 'background.defaultAlt' }} />

      <List dense disablePadding>
        <ListItem disablePadding>
          <ListItemButton onClick={handle(onSettings)} sx={{ px: '16px', py: '8px' }}>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ borderColor: 'background.defaultAlt' }} />

      <List dense disablePadding>
        <ListItem disablePadding>
          <ListItemButton onClick={handle(onLogOut)} sx={{ px: '16px', py: '8px' }}>
            <ListItemText
              primary="Log out"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}

// Segmented Light | Dark control. Selected segment gets a paper chip + primary
// icon — value contrast carries the state in both modes (no light-only tints).
function ThemeModeSwitch() {
  const { mode, setMode } = useThemeMode();
  return (
    <Stack
      direction="row"
      role="group"
      aria-label="Appearance"
      sx={{
        borderRadius: '999px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.defaultAlt',
        p: '2px',
      }}
    >
      {(
        [
          { value: 'light' as ThemeMode, label: 'Light', icon: faSunBright },
          { value: 'dark' as ThemeMode, label: 'Dark', icon: faMoon },
        ]
      ).map((option) => {
        const selected = mode === option.value;
        return (
          <ButtonBase
            key={option.value}
            onClick={() => setMode(option.value)}
            aria-pressed={selected}
            sx={{
              flex: 1,
              minHeight: 26,
              px: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              borderRadius: '999px',
              fontSize: 12,
              fontWeight: 600,
              color: selected ? 'text.primary' : 'text.disabled',
              bgcolor: selected ? 'background.paper' : 'transparent',
              boxShadow: selected ? `0 1px 3px ${alpha(moondust[900], 0.18)}` : 'none',
              transition: 'background-color 180ms cubic-bezier(0.2, 0, 0, 1), color 180ms cubic-bezier(0.2, 0, 0, 1)',
            }}
          >
            <FontAwesomeIcon icon={option.icon} style={{ fontSize: 11 }} />
            {option.label}
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import { Button, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';

import { AccountButton } from './account-button';

// ----------------------------------------------------------------------

export function ProfilePopover() {
  const theme = useTheme();

  const navigate = useNavigate();


  const [drawer, setDrawer] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setDrawer(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawer(false);
  }, []);

  const navigatePage = (page: string) => {
    setDrawer(false);
    setTimeout(() => navigate(page), 500);
  };

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: '', alt: '' },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      name
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        open={drawer}
        onClick={handleOpenDrawer}
        photoURL=''
        displayName=''
      />

      <Drawer
        open={drawer}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>
        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8, pb: 3 }}>
            {renderAvatar}
            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
               name
            </Typography>
          </Stack>
          <Stack
            sx={{
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            <MenuItem
              onClick={() => navigatePage('/profile')}
              sx={{
                py: 1,
                color: 'text.secondary',
                '& svg': { width: 24, height: 24 },
                '&:hover': { color: 'text.primary' },
              }}
            >
              <Iconify icon="iconamoon:profile-duotone" width={24} />
              <Box component="span" sx={{ ml: 2 }}>
                Profile
              </Box>
            </MenuItem>

            <MenuItem
              onClick={() => navigatePage('/projects')}
              sx={{
                py: 1,
                color: 'text.secondary',
                '& svg': { width: 24, height: 24 },
                '&:hover': { color: 'text.primary' },
              }}
            >
              <Iconify icon="octicon:project-roadmap-24" width={24} />
              <Box component="span" sx={{ ml: 2, alignItems: 'center' }}>
                Projects
              </Box>
            </MenuItem>
          </Stack>
        </Scrollbar>
        <Box sx={{ p: 2.5 }}>
          <Button fullWidth variant="soft" size="large" color="error">
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

import type { UserType } from 'src/auth/types';
import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useEffect, useCallback } from 'react';
import { decodeJWT, fetchAuthSession } from 'aws-amplify/auth';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

// ----------------------------------------------------------------------

// export type AccountDrawerProps = IconButtonProps & {
//   data?: {
//     label: string;
//     href: string;
//     icon?: React.ReactNode;
//     info?: React.ReactNode;
//   }[];
//   user?: UserType;
// };

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

export type NavSection = {
  subheader: string;
  items: NavItem[];
};

export type AccountDrawerProps = IconButtonProps & {
  data?: NavSection[];
  user?: UserType;
};

export function AccountDrawer({ data = [], sx, user, ...other }: AccountDrawerProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();

        if (idToken) {
          const decoded = decodeJWT(idToken);
          setUserInfo(decoded);    
        }       
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        // avatar: {
        //   src: business?.restaurantLogo,
        //   alt: name,
        // },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {userInfo?.payload.email.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      {/* <Typography variant="subtitle2" sx={{mx:2}}>{userInfo.username}</Typography> */}
      <AccountButton
        open={open}
        onClick={handleOpenDrawer}
        photoURL=''
        displayName={userInfo?.payload.email}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
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
          <Stack alignItems="center" sx={{ pt: 8 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {userInfo?.payload.email}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {userInfo?.user?.attributes?.jobTitle || ''}
            </Typography>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}

import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';
import { signOut } from 'aws-amplify/auth';

import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      onClose?.();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, [onClose]);

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      Logout
    </Button>
  );
}

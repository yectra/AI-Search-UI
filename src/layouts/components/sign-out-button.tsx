import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';
import { useMsal } from '@azure/msal-react';

import Button from '@mui/material/Button';

import { b2cPolicies } from 'src/auth/authConfig';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {
  const { instance } = useMsal();

  const handleLogout = useCallback(async () => {
    instance.logoutRedirect({
      authority: b2cPolicies.authorities.admin.authority,
      postLogoutRedirectUri: '/',
    });
    onClose?.();
  }, [instance, onClose]);

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      Logout
    </Button>
  );
}

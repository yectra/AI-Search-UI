import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';


// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Button variant="contained" sx={sx} {...other} >
      Sign in
    </Button>
  );
}

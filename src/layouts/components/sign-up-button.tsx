import type { ButtonProps } from '@mui/material/Button';

// import { useMsal } from '@azure/msal-react';

import Button from '@mui/material/Button';

// import { b2cPolicies, loginRequest } from 'src/auth/authConfig';

// ----------------------------------------------------------------------

export function SignUpButton({ sx, ...other }: ButtonProps) {
  // const { instance } = useMsal();

  // const azureLoginActionVendor = async () => {
  //   await instance.loginRedirect({
  //     scopes: loginRequest.scopes,
  //     authority: b2cPolicies.authorities.vendor.authority,
  //   });
  // };
  return (
    <Button variant="outlined" sx={sx} {...other} >
      Register as Vendor
    </Button>
  );
}

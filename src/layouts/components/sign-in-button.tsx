import type { ButtonProps } from '@mui/material/Button';

import { useMsal } from '@azure/msal-react';

import Button from '@mui/material/Button';

import { b2cPolicies, loginRequest } from 'src/auth/authConfig';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  const { instance, accounts } = useMsal();

  const azureLoginAction = async () => {
    try {
      // Check if user is logged in and if their role is Admin
      if (accounts.length > 0 && accounts[0].idTokenClaims?.jobTitle === 'Admin') {
        // Log out the user and redirect to login
        await instance
          .logoutPopup({
            ...loginRequest,
            postLogoutRedirectUri: window.location.href, // This ensures user is redirected after logout
          })
          .then(() => {
            // After logging out, redirect to login page
            instance.loginRedirect({
              scopes: loginRequest.scopes,
              prompt: loginRequest.prompt,
              authority: b2cPolicies.authorities.admin.authority,
            });
          });
      } else {
        // If not an admin, proceed to login directly
        await instance.loginRedirect({
          scopes: loginRequest.scopes,
          prompt: loginRequest.prompt,
          authority: b2cPolicies.authorities.admin.authority,
        });
      }
    } catch (err) {
      console.error('Error occurred while attempting to login:', err);
      throw err;
    }
  };

  return (
    <Button variant="contained" sx={sx} {...other} onClick={azureLoginAction}>
      Sign in
    </Button>
  );
}

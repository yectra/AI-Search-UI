import { InteractionStatus } from '@azure/msal-browser';
import React, { useRef, useState, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

import { SplashScreen } from 'src/components/loading-screen';

import { b2cPolicies, loginRequest } from '../authConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasRedirected = useRef<boolean>(false); // Prevent multiple redirects

  const { inProgress, accounts, instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const fetchToken = async () => {
      if (
        inProgress === InteractionStatus.Startup ||
        inProgress === InteractionStatus.HandleRedirect
      ) {
        return; // Avoid processing during startup or redirect handling
      }

      if (!isAuthenticated) {
        // Avoid multiple login redirects
        if (inProgress === InteractionStatus.None && !hasRedirected.current) {
          hasRedirected.current = true;
          instance.loginRedirect({
            scopes: loginRequest.scopes,
            prompt: loginRequest.prompt,
            authority: b2cPolicies.authorities.admin.authority,
            redirectUri: '/',
          });
        }
        return;
      }

      if (accounts.length > 0 && inProgress === InteractionStatus.None) {
        try {
          await instance.acquireTokenSilent({
            account: accounts[0],
            scopes: loginRequest.scopes,
            prompt: loginRequest.prompt,
            authority: b2cPolicies.authorities.admin.authority,
          });
        } catch (error) {
          if (inProgress === InteractionStatus.None && !hasRedirected.current) {
            hasRedirected.current = true;
            instance.loginRedirect({
              scopes: loginRequest.scopes,
              prompt: loginRequest.prompt,
              authority: b2cPolicies.authorities.admin.authority,
              redirectUri: '/',
            });
          }
        }
      }
      setIsLoading(false);
    };

    fetchToken();
  }, [accounts, inProgress, isAuthenticated, instance]);

  // Show loading until all checks are complete
  if (isLoading || inProgress !== InteractionStatus.None) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;

import { Hub } from 'aws-amplify/utils';
import { useNavigate } from 'react-router';
import React, { useRef, useState, useEffect } from 'react';
import { getCurrentUser, signInWithRedirect } from 'aws-amplify/auth';

import { SplashScreen } from 'src/components/loading-screen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasRedirected = useRef(false); // ✅ Prevents multiple redirects

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser(); // ✅ succeeds if logged in
        setIsAuthenticated(true);
      } catch (error) {
        console.error('User not authenticated:', error);

        // 🔁 Redirect to Cognito Hosted UI (only once)
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          await signInWithRedirect();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const listener = (data: any) => {
      switch (data.payload.event) {
        case 'signIn':
          setIsAuthenticated(true);
          setIsLoading(false);
          break;
        case 'signOut':
          setIsAuthenticated(false);
          navigate('/');
          break;
        default:
          console.log(`Unhandled auth event: ${data.payload.event}`);
      }
    };

    const unsubscribe = Hub.listen('auth', listener);

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default AdminProtectedRoute;

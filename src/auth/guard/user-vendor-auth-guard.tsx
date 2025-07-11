import { Navigate } from 'react-router-dom';
import { InteractionStatus } from '@azure/msal-browser';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const UserVendorProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Check if the user is Admin or not authenticated
  if (accounts.length > 0 && accounts[0].idTokenClaims?.jobTitle === 'Admin') {
    return <Navigate to="/" />;
  }
  // Check if the user is authenticated
  if (!isAuthenticated && inProgress === InteractionStatus.None) {
    return <Navigate to="/" />;
  }
  // Render children if authenticated and not an Admin
  return <>{children}</>;
};

export default UserVendorProtectedRoute;

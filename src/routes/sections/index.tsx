import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/ai-search';

import { LoadingScreen } from 'src/components/loading-screen';

import AdminProtectedRoute from 'src/auth/guard/admin-auth-guard';

// ----------------------------------------------------------------------
// Overview
const Overview = lazy(() => import('src/pages/ai-search/overview'));

// Preview 
const Preview = lazy(() => import('src/pages/ai-search/preview'));

// GetStarted
const SettingPage = lazy(() => import('src/pages/ai-search/setting'));

// ----------------------------------------------------------------------

// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <AdminProtectedRoute>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AdminProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: 'overview',
          element: <Overview />,
        },
        {
          path: 'preview',
          element: <Preview />,
        },
        {
          path: 'setting',
          element: <SettingPage />,
        } 
      ],
    },

    // No match
    // { path: '*', element: <Navigate to="/404" replace /> },
    { path: '500', element: <Page500 /> },
    { path: '404', element: <Page404 /> },
    { path: '403', element: <Page403 /> },
  ]);
}

import React, { Suspense, lazy } from 'react';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import LoadingPage from '../pages/LoadingPage';
import ErrorPage from '../pages/ErrorPage';
import SettingsPage from '../pages/SettingsPage';
import OverviewPage from '../pages/OverviewPage';
import CreateOverviewPage from '../pages/OverviewPage/CreateOverviewPage';
import UpdateOverviewPage from '../pages/OverviewPage/UpdateOverviewPage';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));

export const getRoutes = () => {
  const data = [
    {
      element: (
        <Suspense fallback={<LoadingPage />}>
          <BasicLayout />
        </Suspense>
      ),
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ProtectedLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'overview',
          children: [
            {
              index: true,
              element: <OverviewPage />,
            },
            {
              path: 'create',
              element: <CreateOverviewPage />,
            },
            {
              path: ':id',
              element: <UpdateOverviewPage />,
            },
          ],
        },
        {
          path: '/settings',
          element: <SettingsPage />,
        },
      ],
    },
    { element: <ErrorPage />, path: '*' },
  ] as unknown as RouteObject[];
  return data;
};

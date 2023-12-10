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
import CreateOverviewPage from '../pages/OverviewPage/CreateOverviewPage';
import UpdateOverviewPage from '../pages/OverviewPage/UpdateOverviewPage';
import ListOverviewPage from '../pages/OverviewPage/ListOverviewPage';
import ListEnrollmentPage from '../pages/EnrollmentPage/ListEnrollmentPage';
import CreateEnrollmentPage from '../pages/EnrollmentPage/CreateEnrollmentPage';
import UpdateEnrollmentPage from '../pages/EnrollmentPage/UpdateEnrollmentPage';
import ListRegulationPage from '../pages/RegulationPage/ListRegulationPage';
import CreateRegulationPage from '../pages/RegulationPage/CreateRegulationPage';
import UpdateRegulationPage from '../pages/RegulationPage/UpdateRegulationPage';

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
              element: <ListOverviewPage />,
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
          path: 'enrollment',
          children: [
            {
              index: true,
              element: <ListEnrollmentPage />,
            },
            {
              path: 'create',
              element: <CreateEnrollmentPage />,
            },
            {
              path: ':id',
              element: <UpdateEnrollmentPage />,
            },
          ],
        },
        {
          path: 'regulation',
          children: [
            {
              index: true,
              element: <ListRegulationPage />,
            },
            {
              path: 'create',
              element: <CreateRegulationPage />,
            },
            {
              path: ':id',
              element: <UpdateRegulationPage />,
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

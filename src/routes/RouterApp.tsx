import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import LoadingPage from '../pages/LoadingPage';
import ErrorPage from '../pages/ErrorPage';
import SettingsPage from '../pages/SettingsPage';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<LoadingPage />}>
        <BasicLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
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
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  { element: <ErrorPage />, path: '*' },
]);

const RouterApp = () => {
  return <RouterProvider router={router} />;
};

export default RouterApp;

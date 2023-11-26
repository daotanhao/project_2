import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import LoadingPage from '../pages/LoadingPage';

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
    ],
  },
]);

const RouterApp = () => {
  return <RouterProvider router={router} />;
};

export default RouterApp;

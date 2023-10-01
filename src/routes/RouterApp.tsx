import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import Login from '../pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: '/login',
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedLayout />,
  },
]);

const RouterApp = () => {
  return <RouterProvider router={router} />;
};

export default RouterApp;

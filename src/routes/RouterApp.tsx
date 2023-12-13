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
import ListRefDocPage from '../pages/RefDocPage/ListRefDocPage';
import CreateRefDocPage from '../pages/RefDocPage/CreateRefDocPage';
import UpdateRefDocPage from '../pages/RefDocPage/UpdateRefDocPage';
import ListGeneralKnowledgePage from '../pages/GeneralKnowledgePage/ListGeneralKnowledgePage';
import CreateGeneralKnowledgePage from '../pages/GeneralKnowledgePage/CreateGeneralKnowledgePage';
import UpdateGeneralKnowledgePage from '../pages/GeneralKnowledgePage/UpdateGeneralKnowledgePage';
import ListGraduationConditionPage from '../pages/GraduationConditionPage/ListGraduationConditionPage';
import CreateGraduationConditionPage from '../pages/GraduationConditionPage/CreateGraduationConditionPage';
import UpdateGraduationConditionPage from '../pages/GraduationConditionPage/UpdateGraduationConditionPage';
import ListOutputTypePage from '../pages/OutputTypePage/ListOutputTypePage';
import CreateOutputTypePage from '../pages/OutputTypePage/CreateOutputTypePage';
import UpdateOutputTypePage from '../pages/OutputTypePage/UpdateOutputTypePage';
import ListOutputStandardPage from '../pages/OutputStandardPage/ListOutputStandardPage';
import CreateOutputStandardPage from '../pages/OutputStandardPage/CreateOutputStandardPage';
import UpdateOutputStandardPage from '../pages/OutputStandardPage/UpdateOutputStandardPage';
import ExportPDFPage from '../pages/ExportPDFPage.tsx';

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
              breadcrumb: 'Create Overview',
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
          path: 'refDoc',
          children: [
            {
              index: true,
              element: <ListRefDocPage />,
            },
            {
              path: 'create',
              element: <CreateRefDocPage />,
            },
            {
              path: ':id',
              element: <UpdateRefDocPage />,
            },
          ],
        },
        {
          path: 'generalKnowledge',
          children: [
            {
              index: true,
              element: <ListGeneralKnowledgePage />,
            },
            {
              path: 'create',
              element: <CreateGeneralKnowledgePage />,
            },
            {
              path: ':id',
              element: <UpdateGeneralKnowledgePage />,
            },
          ],
        },
        {
          path: 'graduationCondition',
          children: [
            {
              index: true,
              element: <ListGraduationConditionPage />,
            },
            {
              path: 'create',
              element: <CreateGraduationConditionPage />,
            },
            {
              path: ':id',
              element: <UpdateGraduationConditionPage />,
            },
          ],
        },
        {
          path: 'outputType',
          children: [
            {
              index: true,
              element: <ListOutputTypePage />,
            },
            {
              path: 'create',
              element: <CreateOutputTypePage />,
            },
            {
              path: ':id',
              element: <UpdateOutputTypePage />,
            },
          ],
        },
        {
          path: 'outputStandard',
          children: [
            {
              index: true,
              element: <ListOutputStandardPage />,
            },
            {
              path: 'create',
              element: <CreateOutputStandardPage />,
            },
            {
              path: ':id',
              element: <UpdateOutputStandardPage />,
            },
          ],
        },
        {
          path: '/export',
          element: <ExportPDFPage />,
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

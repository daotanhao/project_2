import React, { Suspense, lazy } from 'react';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import SVGIcon from '../components/SVGIcon';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';

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
import CustomBreadcrumbItem from '../components/CustomBreadcrumbItem';
import ListClassificationScalePage from '../pages/ClassificationScalePage/ListClassificationScalePage';
import CreateClassificationScalePage from '../pages/ClassificationScalePage/CreateClassificationScalePage';
import UpdateClassificationScalePage from '../pages/ClassificationScalePage/UpdateClassificationScalePage';
import ListSubjectCombinationPage from '../pages/SubjectCombinationPage/ListSubjectCombinationPage';
import CreateSubjectCombinationPage from '../pages/SubjectCombinationPage/CreateSubjectCombinationPage';
import UpdateSubjectCombinationPage from '../pages/SubjectCombinationPage/UpdateSubjectCombinationPage';
import ListSubjectDetailsPage from '../pages/SubjectDetailsPage/ListSubjectDetailsPage';
import CreateSubjectDetailsPage from '../pages/SubjectDetailsPage/CreateSubjectDetailsPage';
import UpdateSubjectDetailsPage from '../pages/SubjectDetailsPage/UpdateSubjectDetailsPage';

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
          breadcrumb: () => <SVGIcon component={HomeIcon} />,
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
              breadcrumb: CustomBreadcrumbItem,
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
              breadcrumb: CustomBreadcrumbItem,
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
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'refDoc',
          children: [
            {
              index: true,
              element: <ListRefDocPage />,
              breadcrumb: 'Reference Documents',
            },
            {
              path: 'create',
              element: <CreateRefDocPage />,
            },
            {
              path: ':id',
              element: <UpdateRefDocPage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'generalKnowledge',
          children: [
            {
              index: true,
              element: <ListGeneralKnowledgePage />,
              breadcrumb: 'General Knowledge',
            },
            {
              path: 'create',
              element: <CreateGeneralKnowledgePage />,
            },
            {
              path: ':id',
              element: <UpdateGeneralKnowledgePage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'graduationCondition',
          children: [
            {
              index: true,
              element: <ListGraduationConditionPage />,
              breadcrumb: 'Graduation Condition',
            },
            {
              path: 'create',
              element: <CreateGraduationConditionPage />,
            },
            {
              path: ':id',
              element: <UpdateGraduationConditionPage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'outputType',
          children: [
            {
              index: true,
              element: <ListOutputTypePage />,
              breadcrumb: 'Output Type',
            },
            {
              path: 'create',
              element: <CreateOutputTypePage />,
            },
            {
              path: ':id',
              element: <UpdateOutputTypePage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'outputStandard',
          children: [
            {
              index: true,
              element: <ListOutputStandardPage />,
              breadcrumb: 'Output Standard',
            },
            {
              path: 'create',
              element: <CreateOutputStandardPage />,
            },
            {
              path: ':id',
              element: <UpdateOutputStandardPage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'classificationScale',
          children: [
            {
              index: true,
              element: <ListClassificationScalePage />,
              breadcrumb: 'Classification Scale',
            },
            {
              path: 'create',
              element: <CreateClassificationScalePage />,
            },
            {
              path: ':id',
              element: <UpdateClassificationScalePage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'subjectCombination',

          children: [
            {
              index: true,
              element: <ListSubjectCombinationPage />,
              breadcrumb: 'Subject Combination',
            },
            {
              path: 'create',
              element: <CreateSubjectCombinationPage />,
            },
            {
              path: ':id',
              element: <UpdateSubjectCombinationPage />,
              breadcrumb: CustomBreadcrumbItem,
            },
          ],
        },
        {
          path: 'subjectDetails',
          children: [
            {
              path: 'list/:id',
              element: <ListSubjectDetailsPage />,
              // breadcrumb: '',
            },
            {
              path: 'create/:id',
              element: <CreateSubjectDetailsPage />,
            },
            {
              path: ':id',
              element: <UpdateSubjectDetailsPage />,
              breadcrumb: CustomBreadcrumbItem,
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

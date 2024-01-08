import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sidebar from './partials/Sidebar';
import Headerbar from './partials/Headerbar';
import Breadcrumbs from './partials/Breadcrumbs';
import LoadingPage from '../pages/LoadingPage';

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <Layout>
        <Headerbar />

        <Layout>
          <Sidebar />
          <Content
            // style={{
            //   padding: 24,
            //   margin: 0,
            //   minHeight: 280,
            // }}
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            <Breadcrumbs />

            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;

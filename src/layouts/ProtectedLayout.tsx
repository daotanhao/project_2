import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sidebar from './partials/Sidebar';
import Headerbar from './partials/Headerbar';

const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout style={{ width: window.innerWidth, height: window.innerHeight }}>
      <Layout>
        <Headerbar />

        <Layout>
          <Sidebar />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;

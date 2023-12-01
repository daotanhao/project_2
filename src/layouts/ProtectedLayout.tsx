import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
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
            className="site-layout-background"
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

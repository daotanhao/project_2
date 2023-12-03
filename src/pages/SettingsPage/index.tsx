import { Layout, TabsProps, Tabs, Typography } from 'antd';
import React from 'react';
import MyDetails from './partials/MyDetails';

const SettingsPage = () => {
  const items: TabsProps['items'] = [
    {
      label: 'My details',
      key: 'details',
      children: <MyDetails />,
    },
    {
      label: 'Password',
      key: 'password',
    },
  ];
  return (
    <Layout>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Settings
      </Typography.Title>
      <Tabs items={items} style={{ margin: 0 }} />
    </Layout>
  );
};

export default SettingsPage;

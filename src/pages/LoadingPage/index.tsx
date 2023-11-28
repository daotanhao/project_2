import { Space, Spin } from 'antd';
import React from 'react';

const LoadingPage = () => {
  return (
    <Space
      style={{
        width: '100%',
        height: window.innerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <Spin tip="Loading..." size="large"></Spin>
    </Space>
  );
};

export default LoadingPage;

import { Space, Spin } from 'antd';
import React from 'react';

const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.innerHeight,
      }}
    >
      <Spin size="large"></Spin>
    </div>
  );
};

export default LoadingPage;

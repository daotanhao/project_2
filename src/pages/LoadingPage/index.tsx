import { Spin } from 'antd';
import React from 'react';
import './style.css';

const LoadingPage = () => {
  return (
    <div className="container">
      <Spin size="large"></Spin>
      <span> Loading</span>
    </div>
  );
};

export default LoadingPage;

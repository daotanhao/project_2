import './App.css';
import React from 'react';
import { ConfigProvider, theme } from 'antd';
import RouterApp from './routes/RouterApp';
import { darkThemeConfig, lightThemeConfig } from './asset/theme';

function App() {
  return (
    <ConfigProvider theme={lightThemeConfig}>
      <RouterApp />
    </ConfigProvider>
  );
}

export default App;

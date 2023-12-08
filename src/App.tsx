import './App.css';
import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { getRoutes } from './routes/RouterApp';
import { darkThemeConfig, lightThemeConfig } from './assets/theme';
import { useRoutes } from 'react-router-dom';
import AppProvider from './misc/providers/AppProvider';

function App() {
  const routes = getRoutes();
  const elements = useRoutes(routes);
  return (
    <ConfigProvider theme={lightThemeConfig}>
      <AppProvider>{elements}</AppProvider>
    </ConfigProvider>
  );
}

export default App;

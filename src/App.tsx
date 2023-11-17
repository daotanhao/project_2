import './App.css';
import React from 'react';
import { ConfigProvider, theme } from 'antd';
import RouterApp from './routes/RouterApp';
import { darkThemeConfig, lightThemeConfig } from './asset/theme';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <ConfigProvider theme={lightThemeConfig}>
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

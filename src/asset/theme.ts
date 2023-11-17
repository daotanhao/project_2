import { theme, type ThemeConfig } from 'antd';

export const darkThemeConfig: ThemeConfig = {
  token: {
    colorBgBase: '#1d232c',
    // colorBgContainer: '#1D232C',   
    colorBorder: '#2c2f37',
    colorBgElevated: '#3B4758',


    colorPrimary: '#0077E4',
  },
  algorithm: theme.darkAlgorithm
};

export const lightThemeConfig: ThemeConfig = {
  token: {
    colorBgBase: '#fff',
    // colorBgContainer: '#fff',
    colorBorder: '#e8e8e8',
    colorBgElevated: '#fff',

    colorPrimary: '#0077E4',
  },
  algorithm: theme.defaultAlgorithm
};
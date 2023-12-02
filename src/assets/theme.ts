import { theme, type ThemeConfig } from 'antd';

export const darkThemeConfig: ThemeConfig = {
  token: {
    colorBgBase: '#1d232c',
    // colorBgContainer: '#1D232C',
    colorBorder: '#2c2f37',
    colorBgElevated: '#3B4758',

    colorPrimary: '#0077E4',
  },
  algorithm: theme.darkAlgorithm,
};

export const lightThemeConfig: ThemeConfig = {
  token: {
    colorBgContainer: '#fff',
    colorBgElevated: '#fff',
    colorBgLayout: '#f0f2f5',
    colorPrimary: '#0077E2',
    colorBorder: '#dbdbdb',
    colorBorderBg: '#dbdbdb',
    fontFamily: 'DM Sans, sans-serif',
  },
  components: {
    Layout: {
      siderBg: '#fff',
      headerBg: '#fff',
    },
  },
  algorithm: theme.defaultAlgorithm,
};

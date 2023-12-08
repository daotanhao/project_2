import React, { PropsWithChildren } from 'react';
import { BreadcrumbsProvider } from './BreadcrumbsProvider';
import { AuthProvider } from './AuthProvider';

const AppProvider = (props: PropsWithChildren) => {
  return (
    <AuthProvider>
      <BreadcrumbsProvider>{props.children}</BreadcrumbsProvider>
    </AuthProvider>
  );
};

export default AppProvider;

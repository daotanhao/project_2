import React from 'react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Breadcrumb } from 'antd';
import { getRoutes } from '../../routes/RouterApp';

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();
  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb: any, index: any) => {
        const { match, key } = breadcrumb;
        const shouldNavigate = index !== breadcrumbs.length - 1;
        <Breadcrumb.Item href={match.pathname} key={match.pathname}>
          {breadcrumb}
        </Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

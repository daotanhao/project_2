import React from 'react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Breadcrumb } from 'antd';
import { getRoutes } from '../../routes/RouterApp';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumb style={{ paddingBottom: 12 }}>
      {breadcrumbs.map((b: any, index: any) => {
        const { match, breadcrumb, key } = b;
        const shouldNavigate = index !== breadcrumbs.length - 1;

        return (
          <Breadcrumb.Item key={match.pathname}>
            <Link
              to={match.pathname}
              style={
                shouldNavigate ? { cursor: 'pointer' } : { cursor: 'default' }
              }
            >
              {breadcrumb}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

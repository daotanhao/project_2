import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Breadcrumb } from 'antd';
import { getRoutes } from '../../routes/RouterApp';

const Breadcrumbs = () => {
  const routes = getRoutes();
  const { breadcrumbs } = useBreadcrumbs();
  return (
    <div style={{ marginBottom: 20 }}>
      {breadcrumbs.map(({ match, breadcrumb }: any, index: any) => (
        <span key={match.pathname}>
          <NavLink to={match.pathname}>{breadcrumb}</NavLink>
          {index < breadcrumbs.length - 1 && (
            <span style={{ marginRight: 5, marginLeft: 5 }}>{'>'}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;

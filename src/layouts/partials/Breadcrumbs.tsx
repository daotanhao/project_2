import React from 'react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Breadcrumb } from 'antd';
import { getRoutes } from '../../routes/RouterApp';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

const removeDuplicatePaths = (breadcrumbs: any) => {
  const uniquePaths: any[] = [];

  for (let i = 0; i < breadcrumbs.length; i++) {
    const currentPath = breadcrumbs[i].match.pathname;

    // Kiểm tra xem đường dẫn hiện tại đã xuất hiện trong mảng chưa
    const isDuplicate = uniquePaths.includes(currentPath);

    // Nếu chưa có trong mảng, thêm vào mảng uniquePaths
    if (!isDuplicate) {
      uniquePaths.push(currentPath);
    }
  }

  return uniquePaths;
};

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const uniquePaths = removeDuplicatePaths(breadcrumbs);

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

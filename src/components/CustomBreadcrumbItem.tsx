import React, { useMemo } from 'react';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

const CustomBreadcrumbItem = (props: any) => {
  const { pathname, data } = useBreadcrumbs();
  const key = props.match.pathname;
  const display = useMemo(() => {
    return pathname(key);
  }, [data]);
  return <span style={{ fontWeight: 'bold' }}>{display}</span>;
};

export default CustomBreadcrumbItem;

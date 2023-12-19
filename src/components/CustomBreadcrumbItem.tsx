import React, { useMemo } from 'react';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

const CustomBreadcrumbItem = (props: any) => {
  const { pathname, data } = useBreadcrumbs();
  const key = props.match.pathname;
  const display = useMemo(() => {
    return pathname(key);
  }, [data]);
  console.log('display', display);
  return <span>{display}</span>;
};

export default CustomBreadcrumbItem;

import { useContext } from 'react';
import { BreadcrumbsContext } from '../misc/providers/BreadcrumbsProvider';

export const useBreadcrumbs = () => useContext(BreadcrumbsContext);

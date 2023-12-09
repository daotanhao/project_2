import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { useParams } from 'react-router-dom';

interface BreadcrumbsContextType {
  pathname(key: string): string;
  setPathname: (key: string, value: string) => void;
  data: Record<string, any>;
  breadcrumbs: any;
}

export const BreadcrumbsContext = createContext<BreadcrumbsContextType>(
  {} as BreadcrumbsContextType
);

export const BreadcrumbsProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Record<string, any>>({});
  const breadcrumbs = useReactRouterBreadcrumbs();
  const params = useParams();
  console.log('breadcrumbs', breadcrumbs);
  const pathname = (key: string) => {
    return data[key] || params.pathname || key;
  };
  const setPathname = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };
  const value = { pathname, setPathname, data, breadcrumbs };
  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

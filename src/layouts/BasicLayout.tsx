import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const BasicLayout = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default BasicLayout;

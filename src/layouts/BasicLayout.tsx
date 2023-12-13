import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingPage from '../pages/LoadingPage';

const BasicLayout = () => {
  const { user, loading } = useAuth();
  if (user && !loading) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <LoadingPage />;
  }
  return <Outlet />;
};

export default BasicLayout;

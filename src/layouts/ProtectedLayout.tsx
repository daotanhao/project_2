import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedLayout;

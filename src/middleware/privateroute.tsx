import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  token: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';

const PrivateRoute: React.FC = () => {
  
  const location = useLocation();
  console.log('local', localStorage);
  if (localStorage.token) {
    if (localStorage.token || location.pathname === '/home') {
      return <Outlet />;
    } else {
      return <Navigate to={'/'} />;
    }
  } else {
    return <Navigate to={'/'} />;
  }
};

export default PrivateRoute;

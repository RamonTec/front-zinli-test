import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { GetUserLocalStorage } from '../shared/utils/session.storage';

const PrivateRoute: React.FC = () => {
  
  const location = useLocation();
  const userStorage = GetUserLocalStorage();
  if (userStorage?.data.token) {
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

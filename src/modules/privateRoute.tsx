import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { GetUserLocalStorage } from '../shared/utils/session.storage';
import { LayoutUser } from '../components/layout/layoutUser';

const PrivateRoute: React.FC = () => {
  
  const location = useLocation();
  const userStorage = GetUserLocalStorage();
  if (userStorage?.data.token) {
    if (userStorage.data.token) {
      return (
        <LayoutUser>
          <Outlet />;
        </LayoutUser>
      )
    } else {
      return <Navigate to={'/'} />;
    }
  } else {
    return <Navigate to={'/'} />;
  }
};

export default PrivateRoute;

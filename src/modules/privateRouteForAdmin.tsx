import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router';
import { GetUserLocalStorage } from '../shared/utils/session.storage';
import { LayoutAdmin } from '../components/layout/layoutAdmin';

const PrivateRouteForAdmin: React.FC = () => {
  
  const location = useLocation();
  const userStorage = GetUserLocalStorage();
  if (userStorage?.data.token) {
    if (userStorage.data.token) {
      return (
        <LayoutAdmin>
          <Outlet />
        </LayoutAdmin>
      );
    } else {
      return <Navigate to={'/'} />;
    }
  } else {
    return <Navigate to={'/'} />;
  }
};

export default PrivateRouteForAdmin;

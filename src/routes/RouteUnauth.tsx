import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';

export const RouteUnAuth = (props: RouteProps): JSX.Element => {
  const auth = useAuthContext();

  if (auth?.user.isAuthenticated) return <Redirect to='/' />;

  return <Route {...props} />;
};

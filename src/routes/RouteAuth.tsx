import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthProvider';

export const RouteAuth = (props: RouteProps): JSX.Element => {
  const auth = useAuthContext();

  // if (!auth?.user.token) return <Redirect to='/' />;

  return <Route {...props} />;
};

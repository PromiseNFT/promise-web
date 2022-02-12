import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ROUTES } from './constants';

export const AppRoutes = (): JSX.Element => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Switch>
        {ROUTES.map(({ routeComponent: RouteComponent, path, ...rest }) => (
          <RouteComponent path={path} key={path} {...rest} />
        ))}
      </Switch>
    </Suspense>
  </BrowserRouter>
);

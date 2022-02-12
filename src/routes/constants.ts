import { lazy } from 'react';
import { Route } from 'react-router-dom';

// import Posts from "@/pages/Posts";
import { RouteAuth } from './RouteAuth';
import { RouteUnAuth } from './RouteUnauth';

const Home = lazy(() => import('../pages/Home'));

export const ROUTE_COMPONENTS = {
  auth: RouteAuth,
  unAuth: RouteUnAuth,
  any: Route,
};

export const ROUTES = [
  {
    path: '/',
    component: Home,
    routeComponent: ROUTE_COMPONENTS.auth,
    exact: true,
  },
  // {
  //   path: '/login',
  //   component: Login,
  //   routeComponent: ROUTE_COMPONENTS.unAuth,
  //   exact: true,
  // },
  // {
  //   path: '/posts',
  //   component: Posts,
  //   routeComponent: ROUTE_COMPONENTS.any,
  //   exact: true,
  // },
];

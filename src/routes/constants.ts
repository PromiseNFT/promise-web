import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';

// import Posts from "@/pages/Posts";
import { RouteAuth } from './RouteAuth';
import { RouteUnAuth } from './RouteUnauth';

const Home = lazy(() => import('../pages/Home'));
const CreatePromise = lazy(() => import('../pages/CreatePromise'));

export const ROUTE_COMPONENTS = {
  auth: RouteAuth,
  unAuth: RouteUnAuth,
  any: Route,
};

interface RoutesType {
  path: string;
  component: ReactNode;
  routeComponent: any;
  exact: boolean;
}

export const ROUTES: RoutesType[] = [
  {
    path: '/',
    component: Home,
    routeComponent: ROUTE_COMPONENTS.unAuth,
    exact: true,
  },
  {
    path: '/contract/:key',
    component: CreatePromise,
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

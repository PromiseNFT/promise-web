import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthProvider';
import { AppRoutes } from './routes';
import { globalStyles } from './utils/styles/global';

const client = new QueryClient();

export const App = (): JSX.Element => (
  <QueryClientProvider client={client}>
    <AuthProvider>
      {globalStyles}
      <AppRoutes />
    </AuthProvider>
  </QueryClientProvider>
);

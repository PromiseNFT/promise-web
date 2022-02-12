import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthProvider';
import { AppRoutes } from './routes';

const client = new QueryClient();

export const App = (): JSX.Element => (
  <QueryClientProvider client={client}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </QueryClientProvider>
);

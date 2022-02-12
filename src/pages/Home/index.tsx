import React from 'react';
import { useAuthContext } from '../../contexts/AuthProvider';

const Home = (props: { path: string }): JSX.Element => {
  const auth = useAuthContext();

  return <div>{JSON.stringify(auth, null, 2)}</div>;
};

export default Home;

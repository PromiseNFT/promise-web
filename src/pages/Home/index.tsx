import { Floating } from '../../components/Floating';
import { Header } from '../../components/Header';
import { PromiseList } from '../../components/PromiseList';
import { useAuthContext } from '../../contexts/AuthProvider';
import { DefaultLayout } from './DefaultLayout';

const Home = (props: { path: string }): JSX.Element => {
  const auth = useAuthContext();

  return (
    <DefaultLayout>
      <Header />
      <PromiseList />
      <Floating />
    </DefaultLayout>
  );
};

export default Home;

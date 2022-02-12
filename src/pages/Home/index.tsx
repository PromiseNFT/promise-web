import { Header } from '../../components/Header';
import { useAuthContext } from '../../contexts/AuthProvider';
import { DefaultLayout } from './DefaultLayout';

const Home = (props: { path: string }): JSX.Element => {
  const auth = useAuthContext();

  return (
    <DefaultLayout>
      <Header />
      <div>home</div>
    </DefaultLayout>
  );
};

export default Home;

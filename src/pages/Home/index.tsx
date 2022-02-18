import { Floating } from '../../components/Floating';
import { HomeHeader } from '../../components/HomeHeader';
import { PromiseList } from '../../components/PromiseList';
import { useAuthContext } from '../../contexts/AuthProvider';
import { DefaultLayout } from '../../components/Common/DefaultLayout';

const Home = (props: { path: string }): JSX.Element => {
  const auth = useAuthContext();

  return (
    <DefaultLayout>
      <HomeHeader />
      <PromiseList />
      <Floating />
    </DefaultLayout>
  );
};

export default Home;

import { Container, styled } from '@mui/material';
import { CardComponent } from '../../components/Cards/CardComponent';
import { Header } from '../../components/Header';
import { useAuthContext } from '../../contexts/AuthProvider';
import { DefaultLayout } from './DefaultLayout';

const Home = (props: { path: string }): JSX.Element => {
  const auth = useAuthContext();

  return (
    <DefaultLayout>
      <Header />
      <Wrapper>
        <CardComponent />
      </Wrapper>
    </DefaultLayout>
  );
};

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: blue;
  margin-top: 3.125rem;
`;

export default Home;

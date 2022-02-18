import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Header } from '../../components/Header';

const CreatePromise = (): JSX.Element => {
  return (
    <DefaultLayout>
      <Header>
        <Header.Left>좌</Header.Left>
        <Header.Center>중</Header.Center>
        <Header.Right>우</Header.Right>
      </Header>
    </DefaultLayout>
  );
};

export default CreatePromise;

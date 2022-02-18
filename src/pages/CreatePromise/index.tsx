import { ArrowBack } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Header } from '../../components/Header';
import { PromiseFrom } from '../../components/PromiseForm';
import { CreateButton } from '../../components/PromiseForm/CreateButton';

const CreatePromise = (): JSX.Element => {
  const { goBack } = useHistory();
  return (
    <DefaultLayout>
      <Header>
        <Header.Left>
          <ArrowBack onClick={goBack} />
        </Header.Left>
        <Header.Center>약속 만들기</Header.Center>
      </Header>
      <Container
        sx={{
          backgroundColor: 'red',
          display: 'flex',
          width: 300,
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <PromiseFrom />
        <CreateButton />
      </Container>
    </DefaultLayout>
  );
};

export default CreatePromise;

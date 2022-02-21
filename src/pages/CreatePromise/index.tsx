import { ArrowBack } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Header } from '../../components/Header';
import { PromiseFrom } from '../../components/PromiseForm';
import { ParamType } from '../../types';
import { Edit, Delete } from '@mui/icons-material';

const CreatePromise = (): JSX.Element => {
  const { goBack } = useHistory<ParamType>();
  const { state } = useLocation<ParamType>();
  const [promiseType, setPromiseType] = useState<ParamType['promiseType']>(
    state.promiseType,
  );

  return (
    <DefaultLayout>
      <Header>
        <Header.Left>
          <ArrowBack onClick={goBack} />
        </Header.Left>
        <Header.Center>약속 만들기</Header.Center>
        {promiseType === 'read' && (
          <Header.Right>
            <Delete />
            <Edit
              onClick={() => {
                setPromiseType('edit');
              }}
            />
          </Header.Right>
        )}
      </Header>
      <Container
        sx={{
          display: 'flex',
          width: 300,
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <PromiseFrom promiseType={promiseType} />
      </Container>
    </DefaultLayout>
  );
};

export default CreatePromise;

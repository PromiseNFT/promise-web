import { ArrowBack } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Header } from '../../components/Header';
import { PromiseFrom } from '../../components/PromiseForm';
import { ContractDetail, ParamType } from '../../types';
import { Edit, Delete } from '@mui/icons-material';
import { AppServer } from '../../utils/api';

const initialData = {
  user_addr: 'Klip Address',
  title: '',
  ctnt: '',
  date: String(new Date()),
  time: '',
  location: '',
  head_count: 0, // The number of Contract's signers
};

const CreatePromise = (): JSX.Element => {
  const { goBack } = useHistory<ParamType>();
  const { state } = useLocation<ParamType>();
  const [promiseType, setPromiseType] = useState<ParamType['promiseType']>(
    state.promiseType,
  );
  const [data, setData] = useState<ContractDetail>();

  const getContractDetail = useCallback(async () => {
    if (state.id) {
      const result = await AppServer.getContractDetail(state.id);
      console.log('상세 : ', result.data);
      setData(result.data || initialData);
    }
  }, [state.id, setData]);

  const render = useMemo(() => {
    if (data !== undefined) {
      return <PromiseFrom data={data} promiseType={promiseType} />;
    }
  }, [data, promiseType]);

  useEffect(() => {
    if (promiseType === 'read') {
      getContractDetail();
      return;
    }
    setData(initialData);
  }, [getContractDetail, setData]);

  console.log('data : ', data);
  return (
    <DefaultLayout>
      <Header>
        <Header.Left>
          <ArrowBack onClick={goBack} />
        </Header.Left>
        <Header.Center>
          {data?.title ? data.title : '약속 만들기'}
        </Header.Center>
        {promiseType === 'read' && (
          <Header.Right>
            {/* 삭제 수정 권한은? */}
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
        {render}
      </Container>
    </DefaultLayout>
  );
};

export default CreatePromise;

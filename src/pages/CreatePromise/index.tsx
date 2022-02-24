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
import { useAuthContext } from '../../contexts/AuthProvider';

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
  const auth = useAuthContext();
  const { goBack } = useHistory<ParamType>();
  const { state, pathname } = useLocation<ParamType>();
  const splicedPathname = pathname.split('/');
  const id = Number(splicedPathname[splicedPathname.length - 1]);
  const [promiseType, setPromiseType] = useState<ParamType['promiseType']>(
    state?.promiseType || 'read',
  );
  const [data, setData] = useState<ContractDetail>();

  const getContractDetail = useCallback(async () => {
    if (id) {
      const result = await AppServer.getContractDetail(id);
      console.log('상세 : ', result.data);
      setData(result.data || initialData);
    }
  }, [id, setData]);

  const handleDelete = async (): Promise<void> => {
    if (data?.id !== undefined && confirm('약속을 삭제하시겠습니까?')) {
      await AppServer.deleteContract(data.id);
      goBack();
    }
  };

  const handleEdit = (): void => {
    setPromiseType('edit');
  };

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
        {/* 삭제 수정 권한은? */}
        {promiseType === 'read' &&
          auth?.user.token !== undefined &&
          data?.user_addr === auth.user.token && (
            <Header.Right>
              <Delete onClick={handleDelete} />
              <Edit onClick={handleEdit} />
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

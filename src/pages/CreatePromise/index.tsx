import { ArrowBack } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultLayout } from '../../components/Common/DefaultLayout';
import { Header } from '../../components/Header';
import { PromiseFrom } from '../../components/PromiseForm';
import { ParamType } from '../../types';
import { Edit, Delete } from '@mui/icons-material';
import { AppServer } from '../../utils/api';

const tempData = {
  id: 1, // BIGINT
  user_addr: 'Klip Address',
  crt_dttm: '2020-01-01 24:00 11.111',
  account_addr: 'String KAS Account Address',
  account_pub_key: 'String KAS Account Address Public Key',
  title: 'Sample Title Example',
  ctnt: 'Sample Content Example',
  date: '2022-02-24',
  time: 'Time (Str)',
  location: 'Sample Location',
  head_count: 2, // The number of Contract's signers
  signs: [
    // Information Of Signer
    {
      id: 1,
      // sign_dttm: 'DATETIME',
      user_addr: 'Klip Address', // If Null, the contract is unsigned
    },
    {
      id: 2,
      // sign_dttm: 'DATETIME',
      user_addr: 'Klip Address', // If Null, the contract is unsigned
    }, // Etc
  ],
  // tx: {
  //   // If Null -> The contract is that no transaction has been created
  //   id: 1,
  //   tx_dttm: 'DATETIME',
  //   tx_hash: 'String Tx Hash',
  //   image_path: 'Path Of Image', // 구현 안 할 수도 . . .
  //   token_id: 'Token Id Str',
  //   meta_data: 'Content of Tx (Str)',
  // },
};

const CreatePromise = (): JSX.Element => {
  const { goBack } = useHistory<ParamType>();
  const { state } = useLocation<ParamType>();
  const [promiseType, setPromiseType] = useState<ParamType['promiseType']>(
    state.promiseType,
  );
  const [data, setData] = useState(tempData);

  const getContractDetail = useCallback(async () => {
    if (state.id) {
      const result = await AppServer.getContractDetail(state.id);
    }
  }, [state.id]);

  useEffect(() => {
    if (promiseType === 'read') {
      getContractDetail();
    }
  }, [getContractDetail]);

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
        <PromiseFrom data={data} promiseType={promiseType} />
      </Container>
    </DefaultLayout>
  );
};

export default CreatePromise;

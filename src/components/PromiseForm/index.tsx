// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getResult, prepare, request } from 'klip-sdk';
import {
  Box,
  Button as MuiButton,
  Modal,
  styled,
  SxProps,
  TextField,
} from '@mui/material';
import {
  Place,
  AccessTime,
  Groups,
  Title,
  Description,
} from '@mui/icons-material';
import { useInputs } from '../../utils/hooks/useInputs';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../utils/hooks/useModal';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ContractDetail, ParamType } from '../../types';
import { useAuthContext } from '../../contexts/AuthProvider';
import { AppServer } from '../../utils/api';
import { MAINNET_NETWORK_ID } from '../HomeHeader/useConnectButton';

const style: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  data: ContractDetail;
  promiseType: ParamType['promiseType'];
}

export const PromiseFrom = ({ data, promiseType }: Props): JSX.Element => {
  const auth = useAuthContext();
  // const [input, setInput] = useInputs(data);
  const [input, setInput] = useState<ContractDetail>(data);

  const handleChange = useCallback(
    (name: keyof ContractDetail): ((value: string | Date) => void) =>
      (value: string | Date): void =>
        setInput((state) => ({
          ...state,
          [name]: value,
        })),
    [setInput],
  );
  const { isOpen, handleOpen, handleClose } = useModal();

  const { goBack, replace } = useHistory();

  const handleCreateClick = async () => {
    try {
      // 만들기 api
      const isExistEmpty = Object.values(input).some((item) => item === '');

      if (isExistEmpty) {
        alert('모두 입력해 주세요');
        return;
      }

      const result = await AppServer.createContract({
        title: input.title,
        ctnt: input.ctnt,
        date: input.date as string,
        time: input.time,
        location: input.location,
        head_count: input.head_count,
      });
      goBack();
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const handleEditClick = async () => {
    // 수정 api
    const isExistEmpty = Object.keys(input).some((item) => item === '');

    if (isExistEmpty || data?.id === undefined) {
      alert('모두 입력해 주세요');
      return;
    }

    try {
      const result = await AppServer.updateContract({
        id: data.id,
        title: input.title,
        ctnt: input.ctnt,
        date: format(new Date(input.date), 'yyMMdd'),
        time: input.time,
        location: input.location,
        head_count: input.head_count,
      });
      console.log('수정 결과 : ', result);
      goBack();
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const handleRecordClick = async () => {
    if (data?.id) {
      try {
        const result = await AppServer.publishContract(data.id);
        alert('소중한 약속이 기록되었습니다! 꼭 지키세요!');
        replace('/');
      } catch (error) {
        console.log('error : ', error);
      }
    }
  };

  const handleParticipationClick = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) {
      alert('카이카스를 설치해주세요.');
      return false;
    }

    const wallet = await klaytn.enable();
    const version = await klaytn.networkVersion;

    if (wallet !== undefined && version === MAINNET_NETWORK_ID) {
      if (data?.id) {
        const result = await AppServer.signContract(data.id);
        alert('참여완료!');
        replace('/');
        return;
      }
    }
    alert('실패했습니다.');

    // const bappName = '약속';
    // const successLink = '';
    // const failLink = '';
    // const res = await prepare.auth({ bappName, successLink, failLink });
    // if (res.err) {
    //   // 에러 처리
    //   console.log('res.err : ', res.err);
    // } else if (res.request_key) {
    //   // request_key 보관
    //   request(res.request_key, () => alert('모바일 환경에서 실행해주세요'));
    //   let time = 0;
    //   const interval = setInterval(async () => {
    //     if (time > 60) {
    //       alert('서명 실패!');
    //       clearInterval(interval);
    //     }
    //     const response = await getResult(res.request_key);
    //     time++;
    //     if (response.status === 'completed') {
    //       try {
    //         if (data?.id) {
    //           const result = await AppServer.signContract(data.id);
    //           alert('참여완료!');
    //           goBack();
    //         }
    //         clearInterval(interval);
    //       } catch (error) {
    //         console.log('error : ', error);
    //         clearInterval(interval);
    //       }
    //     }
    //   }, 1000);
    // }
  };

  const handleChangeText =
    (key: keyof ContractDetail) => (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(key)(e.target.value);
    };

  console.log('data : ', data);
  console.log('input : ', input);

  // useEffect(() => {
  //   setInput(data);
  // }, []);
  const parsedAddressSigns = (data?.signs || []).map((v) => v.user_addr);

  return (
    <>
      <InputWrapper>
        <AccessTime />
        <TextField
          id='date'
          value={format(
            typeof input.date === 'string' ? new Date(input.date) : input.date,
            'yyyy년 MM월 dd일',
          )}
          onClick={promiseType === 'read' ? undefined : handleOpen}
          label='날짜을 입력해주세요.'
          variant='outlined'
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      <InputWrapper>
        <AccessTime />
        <TextField
          id='time'
          value={input.time}
          onChange={handleChangeText('time')}
          label='시간을 입력해주세요.'
          variant='outlined'
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      <InputWrapper>
        <Place />
        <TextField
          id='location'
          value={input.location}
          onChange={handleChangeText('location')}
          label='장소를 입력해주세요.'
          variant='outlined'
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      <InputWrapper>
        <Title />
        <TextField
          id='title'
          value={input.title}
          onChange={handleChangeText('title')}
          label='제목을 입력해주세요.'
          variant='outlined'
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      <InputWrapper>
        <Description />
        <TextField
          id='ctnt'
          value={input.ctnt}
          onChange={handleChangeText('ctnt')}
          label='내용을 입력해주세요.'
          variant='outlined'
          multiline={true}
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      <InputWrapper>
        <Groups />
        <TextField
          id='head_count'
          value={
            promiseType === 'read'
              ? `${parsedAddressSigns.filter((v) => v !== null).length} / ${
                  data.head_count
                }`
              : input.head_count
              ? input.head_count
              : ''
          }
          onChange={handleChangeText('head_count')}
          label='인원을 입력해주세요.'
          variant='outlined'
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      {promiseType === 'create' && (
        <Button onClick={handleCreateClick} variant='contained'>
          약속 만들기
        </Button>
      )}
      {promiseType === 'read' &&
        parsedAddressSigns.some((v) => v === auth?.user.token) &&
        data.head_count ===
          parsedAddressSigns.filter((v) => v !== null).length && (
          <Button onClick={handleRecordClick} variant='contained'>
            소중한 약속 기록하기
          </Button>
        )}
      {promiseType === 'read' &&
        parsedAddressSigns.every((v) => v !== auth?.user.token) &&
        parsedAddressSigns.filter((v) => v !== null).length <
          data.head_count && (
          <Button onClick={handleParticipationClick} variant='contained'>
            약속에 참여하기
          </Button>
        )}
      {promiseType === 'edit' && (
        <Button onClick={handleEditClick} variant='contained'>
          저장 하기
        </Button>
      )}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Calendar
            value={
              typeof input.date === 'string' ? new Date(input.date) : input.date
            }
            onChange={(value: Date, event: ChangeEvent<HTMLInputElement>) => {
              handleChange('date')(value);
              handleClose();
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

const InputWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,
});

const Button = styled(MuiButton)({
  width: '100%',
});

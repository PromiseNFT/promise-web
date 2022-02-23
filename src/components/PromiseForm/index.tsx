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

  const { goBack } = useHistory();

  const handleCreateClick = async () => {
    // 만들기 api
    const isExistEmpty = Object.keys(input).some((item) => item === '');

    if (isExistEmpty) {
      alert('모두 입력해 주세요');
    }

    try {
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

    if (isExistEmpty) {
      alert('모두 입력해 주세요');
    }

    try {
      const result = await AppServer.updateContract();
      goBack();
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const handleRecordClick = async () => {
    if (data?.id) {
      try {
        const result = await AppServer.publishContract(data.id);
        goBack();
      } catch (error) {
        console.log('error : ', error);
      }
    }
  };

  const handleParticipationClick = async () => {
    const bappName = '약속';
    const successLink = '';
    const failLink = '';
    const res = await prepare.auth({ bappName, successLink, failLink });
    if (res.err) {
      // 에러 처리
      console.log('res.err : ', res.err);
    } else if (res.request_key) {
      // request_key 보관
      request(res.request_key, () => alert('모바일 환경에서 실행해주세요'));
      let time = 0;
      const interval = setInterval(async () => {
        if (time > 60) {
          alert('서명 실패!');
          clearInterval(interval);
        }
        const response = await getResult(res.request_key);
        time++;
        if (response.status === 'completed') {
          try {
            if (data?.id) {
              const result = await AppServer.signContract(data.id);
              alert('참여완료!');
              goBack();
            }
            clearInterval(interval);
          } catch (error) {
            console.log('error : ', error);
            clearInterval(interval);
          }
        }
      }, 1000);
    }
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
              ? `${data?.signs?.length} / ${data.head_count}`
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
        data?.signs?.some((v) => v.user_addr === auth?.user.token) &&
        data.head_count === data?.signs?.length && (
          <Button onClick={handleRecordClick} variant='contained'>
            소중한 약속 기록하기
          </Button>
        )}
      {promiseType === 'read' &&
        data?.signs?.every((v) => v.user_addr !== auth?.user.token) && (
          <Button onClick={handleParticipationClick} variant='contained'>
            약속에 참여하기
          </Button>
        )}
      {promiseType === 'edit' && (
        // TODO 저장 권한은?
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

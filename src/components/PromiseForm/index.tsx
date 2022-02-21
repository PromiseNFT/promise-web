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
import { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../utils/hooks/useModal';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ParamType } from '../../types';

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

interface InputType {
  date: Date;
  time: string;
  place: string;
  title: string;
  description: string;
  peopleCount: string;
}

const initialInputs: InputType = {
  date: new Date(),
  time: '',
  place: '',
  title: '',
  description: '',
  peopleCount: '',
};

export const PromiseFrom = ({ promiseType }: ParamType): JSX.Element => {
  const [input, setInput] = useInputs(initialInputs);
  const { isOpen, handleOpen, handleClose } = useModal();

  const { goBack } = useHistory();

  const handleCreateClick = () => {
    // 만들기 api
    const isExistEmpty = Object.keys(input).some((item) => item === '');

    if (isExistEmpty) {
      alert('모두 입력해 주세요');
    }

    goBack();
  };

  const handleEditClick = () => {
    // 수정 api
    const isExistEmpty = Object.keys(input).some((item) => item === '');

    if (isExistEmpty) {
      alert('모두 입력해 주세요');
    }

    goBack();
  };

  const handleRecordClick = () => {
    // 기록 api
    goBack();
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
      const interval = setInterval(async () => {
        const response = await getResult(res.request_key);
        if (response.status === 'completed') {
          alert('서명 완료!');
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  const handleChangeText =
    (key: keyof InputType) => (e: ChangeEvent<HTMLInputElement>) => {
      setInput(key)(e.target.value);
    };

  return (
    <>
      <InputWrapper>
        <AccessTime />
        <TextField
          id='date'
          value={format(input.date, 'yyyy년 MM월 dd일')}
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
          id='place'
          value={input.place}
          onChange={handleChangeText('place')}
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
          id='description'
          value={input.description}
          onChange={handleChangeText('description')}
          label='내용을 입력해주세요.'
          variant='outlined'
          multiline={true}
          disabled={promiseType === 'read'}
        />
      </InputWrapper>
      <InputWrapper>
        <Groups />
        <TextField
          id='peopleCount'
          value={input.peopleCount}
          onChange={handleChangeText('peopleCount')}
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
      {/* {promiseType === 'read' && (
        <Button onClick={handleRecordClick} variant='contained'>
          소중한 약속 기록하기
        </Button>
      )} */}
      {promiseType === 'read' && (
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
            value={input.date}
            onChange={(value: Date, event: ChangeEvent<HTMLInputElement>) => {
              setInput('date')(value);
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

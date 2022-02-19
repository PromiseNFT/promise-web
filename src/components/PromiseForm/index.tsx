import { Box, Modal, styled, SxProps, TextField } from '@mui/material';
import {
  Place,
  AccessTime,
  Groups,
  Title,
  Description,
} from '@mui/icons-material';
import { useInputs } from '../../utils/hooks/useInputs';
import { ChangeEvent, useEffect } from 'react';
import { CreateButton } from './CreateButton';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../utils/hooks/useModal';
import Calendar from 'react-calendar';
import { format } from 'date-fns';

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

export const PromiseFrom = (): JSX.Element => {
  const [input, setInput] = useInputs(initialInputs);
  const { isOpen, handleOpen, handleClose } = useModal();

  const { goBack } = useHistory();

  const handleClick = () => {
    const isExistEmpty = Object.keys(input).some((item) => item === '');

    if (isExistEmpty) {
      alert('모두 입력해 주세요');
    }

    goBack();
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
          onClick={handleOpen}
          label='날짜을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <AccessTime />
        <TextField
          id='time'
          value={input.time}
          onChange={handleChangeText('time')}
          onClick={handleOpen}
          label='시간을 입력해주세요.'
          variant='outlined'
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
        />
      </InputWrapper>
      <CreateButton onClick={handleClick} />
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

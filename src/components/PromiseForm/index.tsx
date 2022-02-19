import { Box, styled, TextField } from '@mui/material';
import {
  Place,
  AccessTime,
  Groups,
  Title,
  Description,
} from '@mui/icons-material';
import { useInputs } from '../../utils/hooks/useInputs';
import { useEffect } from 'react';
import { CreateButton } from './CreateButton';
import { useHistory } from 'react-router-dom';

const initialInputs = {
  time: '',
  place: '',
  title: '',
  description: '',
  peopleCount: '',
};

export const PromiseFrom = (): JSX.Element => {
  const [input, setInput] = useInputs(initialInputs);

  const { goBack } = useHistory();

  const handleClick = () => {
    const isExistEmpty = Object.keys(input).some((item) => item === '');

    if (isExistEmpty) {
      alert('모두 입력해 주세요');
    }

    goBack();
  };

  useEffect(() => {
    console.log('input : ', input);
  }, [input]);

  return (
    <>
      <InputWrapper>
        <AccessTime />
        <TextField
          id='time'
          value={input.time}
          onChange={setInput('time')}
          label='약속 시간을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Place />
        <TextField
          id='place'
          value={input.place}
          onChange={setInput('place')}
          label='장소를 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Title />
        <TextField
          id='title'
          value={input.title}
          onChange={setInput('title')}
          label='제목을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Description />
        <TextField
          id='description'
          value={input.description}
          onChange={setInput('description')}
          label='내용을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Groups />
        <TextField
          id='peopleCount'
          value={input.peopleCount}
          onChange={setInput('peopleCount')}
          label='인원을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <CreateButton onClick={handleClick} />
    </>
  );
};

const InputWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,
});

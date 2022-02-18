import { Box, styled, TextField } from '@mui/material';
import {
  Place,
  AccessTime,
  Groups,
  Title,
  Description,
  Image,
} from '@mui/icons-material';

export const PromiseFrom = (): JSX.Element => {
  return (
    <>
      <InputWrapper>
        <AccessTime />
        <TextField
          id='time'
          label='약속 시간을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Place />
        <TextField id='place' label='장소를 입력해주세요.' variant='outlined' />
      </InputWrapper>
      <InputWrapper>
        <Title />
        <TextField id='title' label='제목을 입력해주세요.' variant='outlined' />
      </InputWrapper>
      <InputWrapper>
        <Description />
        <TextField
          id='description'
          label='내용을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Groups />
        <TextField
          id='peopleCount'
          label='인원을 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
      <InputWrapper>
        <Image />
        <TextField
          id='image'
          label='올릴 사진이 있다면 입력해주세요.'
          variant='outlined'
        />
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,
});

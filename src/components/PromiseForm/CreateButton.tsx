import { Button as MuiButton, styled } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';

export const CreateButton = (): JSX.Element => {
  const { goBack } = useHistory();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    goBack();
  };

  return (
    <Button onClick={handleClick} variant='contained'>
      약속 만들기
    </Button>
  );
};

const Button = styled(MuiButton)({
  width: '100%',
});

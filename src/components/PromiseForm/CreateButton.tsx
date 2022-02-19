import { Button as MuiButton, styled } from '@mui/material';
import { MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const CreateButton = ({ onClick }: Props): JSX.Element => {
  return (
    <Button onClick={onClick} variant='contained'>
      약속 만들기
    </Button>
  );
};

const Button = styled(MuiButton)({
  width: '100%',
});

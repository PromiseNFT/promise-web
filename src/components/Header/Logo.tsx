import { Button, styled, Typography } from '@mui/material';

export const Logo = (): JSX.Element => {
  return (
    <Wrapper>
      <Typography fontSize={24} fontWeight='bold' color='black'>
        Promise
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  position: absolute;
  z-index: 20;
  left: 0;
  height: 100%;
`;

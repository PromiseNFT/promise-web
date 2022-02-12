import { Button, styled, Typography } from '@mui/material';

export const Logo = (): JSX.Element => {
  return (
    <Wrapper>
      <Typography
        variant='h6'
        noWrap
        component='div'
        color='green'
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        Promise
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  position: absolute;
  padding: inherit;
  left: 0;
  height: 100%;
`;

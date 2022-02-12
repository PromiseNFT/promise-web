import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const ConnectButton = (): JSX.Element => {
  return (
    <Wrapper variant='contained' color='success'>
      connect wallet
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  position: absolute;
  padding: inherit;
  right: 0;
  height: 80%;
`;

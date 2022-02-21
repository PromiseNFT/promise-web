import { Box, Button as MuiButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useAuthContext } from '../../contexts/AuthProvider';
import { useConnectButton } from './useConnectButton';

export const ConnectButton = (): JSX.Element => {
  const { onClick } = useConnectButton();
  const auth = useAuthContext();

  return (
    <Wrapper>
      <Button variant='contained' color='success' onClick={onClick}>
        <AddressText>{auth?.user.token || 'CONNECT WALLET'}</AddressText>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  position: absolute;
  height: 80%;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled(MuiButton)`
  padding: 15px;
  border-radius: 15px;
`;

const AddressText = styled(Typography)`
  width: 140px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
`;

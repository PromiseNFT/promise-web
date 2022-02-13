import styled from '@emotion/styled';
import { ConnectButton } from './ConnectButton';
import { Logo } from './Logo';

export const Header = (): JSX.Element => {
  return (
    <Wrapper>
      <Logo />
      <ConnectButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 10;

  position: fixed;

  top: 0;

  width: 100%;
  height: 3.125rem;

  box-sizing: border-box;

  display: flex;
  align-items: center;

  padding-right: 1.375rem;
  padding-left: 1.375rem;

  flex-direction: row;
  align-items: center;
`;

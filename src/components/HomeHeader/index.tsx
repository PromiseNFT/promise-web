import { Header } from '../Header';
import { ConnectButton } from './ConnectButton';
import { Logo } from './Logo';

export const HomeHeader = (): JSX.Element => {
  return (
    <Header>
      <Header.Left>
        <Logo />
      </Header.Left>
      <Header.Right>
        <ConnectButton />
      </Header.Right>
    </Header>
  );
};

import { MouseEventHandler } from 'react';

interface Return {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const useConnectButton = (): Return => {
  const onClick = (): void => {
    return;
  };
  return {
    onClick,
  };
};

import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';

interface Return {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const useFloating = (): Return => {
  const { push } = useHistory();

  return {
    onClick: () => {
      push('/createPromise');
    },
  };
};

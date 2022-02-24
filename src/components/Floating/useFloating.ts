import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import { ParamType } from '../../types';

interface Return {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const useFloating = (): Return => {
  const { push } = useHistory<ParamType>();

  return {
    onClick: () => {
      push('/contract/0', { promiseType: 'create' });
    },
  };
};

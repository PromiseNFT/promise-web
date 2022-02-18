import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface UseModalParams {
  initialIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (value: boolean) => void;
}

export interface UseModalReturn {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
}

export const useModal = (props: UseModalParams = {}): UseModalReturn => {
  const { initialIsOpen, onOpen, onClose, onToggle } = props;

  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen ?? false);

  const handleOpen = useCallback(() => {
    if (onOpen !== undefined) {
      onOpen();
      return;
    }

    setIsOpen(true);
  }, [onOpen]);

  const handleClose = useCallback(() => {
    if (onClose !== undefined) {
      onClose();
      return;
    }
    setIsOpen(false);
  }, [onClose]);

  const handleToggle = useCallback(() => {
    if (onToggle !== undefined) {
      onToggle(isOpen);
      return;
    }
    setIsOpen(false);
  }, [isOpen, onToggle]);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
  };
};

export interface UseModalAnimatedStateParams {
  isOpen: boolean;
  duration: number;
}

export type UseModalAnimatedStateReturn = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];

export const useModalAnimatedState = ({
  isOpen,
  duration,
}: UseModalAnimatedStateParams): UseModalAnimatedStateReturn => {
  const [isShowed, setIsShowed] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isShowed === isOpen) {
      return;
    }

    if (isShowed === true && isOpen === false) {
      const setIsShowedTimeout = window.setTimeout(
        () => setIsShowed(false),
        duration,
      );

      return (): void => window.clearTimeout(setIsShowedTimeout);
    }

    setIsShowed(isOpen);
  }, [duration, isOpen, isShowed]);

  return [isShowed, setIsShowed];
};

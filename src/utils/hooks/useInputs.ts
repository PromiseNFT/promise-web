import { ChangeEvent, useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useInputs<T extends {}>(
  initialValues: T,
): [T, (name: keyof T) => (text: ChangeEvent<HTMLInputElement>) => void] {
  const [inputs, setInputs] = useState<T>(initialValues);

  const handleChange = useCallback(
    (name: keyof T): ((text: ChangeEvent<HTMLInputElement>) => void) =>
      (text: ChangeEvent<HTMLInputElement>): void =>
        setInputs((state) => ({ ...state, [name]: text.target.value })),
    [setInputs],
  );

  return [inputs, handleChange];
}

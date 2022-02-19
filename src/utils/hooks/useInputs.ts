import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useInputs<T extends {}>(
  initialValues: T,
): [T, (name: keyof T) => (value: string | Date) => void] {
  const [inputs, setInputs] = useState<T>(initialValues);

  const handleChange = useCallback(
    (name: keyof T): ((value: string | Date) => void) =>
      (value: string | Date): void =>
        setInputs((state) => ({
          ...state,
          [name]: value,
        })),
    [setInputs],
  );

  return [inputs, handleChange];
}

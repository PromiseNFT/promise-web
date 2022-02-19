export const omit = <T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  const result = { ...obj };

  keys.forEach((key) => {
    if (key in result) {
      delete result[key];
    }
  });

  return result;
};

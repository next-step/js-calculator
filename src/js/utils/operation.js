export const calcOperation = (a, b) => {
  return {
    ['/']: () => a / b,
    ['X']: () => a * b,
    ['-']: () => a - b,
    ['+']: () => a + b,
  };
};

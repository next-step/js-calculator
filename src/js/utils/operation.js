export const calcOperation = (a, b) => {
  return {
    ['/']: () => Math.trunc(Number(a) / Number(b)),
    ['X']: () => Number(a) * Number(b),
    ['-']: () => Number(a) - Number(b),
    ['+']: () => Number(a) + Number(b),
  };
};

export const operation = (n, m) => {
  return {
    ["/"]: () => Math.trunc(Number(n) / Number(m)),
  };
};

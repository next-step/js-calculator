const OPERATIONS = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  X: (x, y) => x * y,
  '/': (x, y) => Math.trunc(x / y),
};

export { OPERATIONS };

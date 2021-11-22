export const OPERATORS = Object.freeze({
  X: (a, b) => a * b,
  '/': (a, b) => (a / b).toFixed(0),
  '-': (a, b) => a - b,
  '+': (a, b) => a + b,
})

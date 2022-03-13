const Operator = {
  PLUS: (left, right) => left + right,
  MINUS: (left, right) => left - right,
  DIVIDE: (left, right) => Math.floor(left / right),
  MULTIPLY: (left, right) => left * right,
};

export default Operator;

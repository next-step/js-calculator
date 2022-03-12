const constant = {
  OPERATOR: {
    PLUS: (left, right) => left + right,
    MINUS: (left, right) => left - right,
    DIVIDE: (left, right) => left / right,
    MULTIPLY: (left, right) => left * right,
  },
  STATE_KEY: {
    LEFT_OPERAND: "leftOperand",
    RIGHT_OPERAND: "rightOperand",
    OPERATOR: "operator",
    TOTAL: "total",
  },
};

export default constant;

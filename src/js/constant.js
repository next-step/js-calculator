const constant = {
  OPERATOR: {
    PLUS: (left, right) => left + right,
    MINUS: (left, right) => left - right,
    DIVIDE: (left, right) => left / right,
    MULTIPLY: (left, right) => left * right,
  },
  STATE_KEY: {
    TOTAL: "total",
    OPERATOR: "operator",
    LEFT_OPERAND: "leftOperand",
    RIGHT_OPERAND: "rightOperand",
  },
  OPERATOR_SYMBOL: {
    PLUS: "+",
    MINUS: "-",
    DIVIDE: "/",
    MULTIPLY: "X",
    RESULT: "=",
  },
  MESSAGE: {
    OPERAND_LENGTH: "[ERROR] 숫자는 한번에 최대 3자리 수까지 입력 가능합니다.",
    OPERATOR_ORDER: "[ERROR] 연산자는 숫자 뒤에 와야합니다.",
  },
  MAX_OPERAND_LENGTH: 3,
};

export default constant;

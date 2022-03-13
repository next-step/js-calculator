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
  BUTTON_SYMBOL: {
    RESULT: "RESULT",
  },
  OPERATOR_SYMBOL: {
    PLUS: "+",
    MINUS: "-",
    DIVIDE: "/",
    MULTIPLY: "X",
  },
  MESSAGE: {
    OPERAND_LENGTH: "[ERROR] 숫자는 한번에 최대 3자리 수까지 입력 가능합니다.",
  },
  MAX_OPERAND_LENGTH: 3,
};

export default constant;

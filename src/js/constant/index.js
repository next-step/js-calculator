export const STATE_KEY = {
  TOTAL: "total",
  OPERATOR: "operator",
  LEFT_OPERAND: "leftOperand",
  RIGHT_OPERAND: "rightOperand",
};

export const OPERATOR_SYMBOL = {
  MINUS: "-",
  DIVIDE: "/",
  MULTIPLY: "X",
  RESULT: "=",
};

export const MESSAGE = {
  OPERAND_LENGTH: "[ERROR] 숫자는 한번에 최대 3자리 수까지 입력 가능합니다.",
  OPERATOR_ORDER: "[ERROR] 연산자는 숫자 뒤에 와야합니다.",
};

export const MAX_OPERAND_LENGTH = 3;

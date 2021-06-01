const BUTTON_TYPE = {
  DIGIT: "digit",
  MODIFIER: "modifier",
  OPERATION: "operation",
};

const ERROR_MESSAGES = {
  DIGIT_LIMIT: "숫자는 최대 3자리 수까지 입력 가능합니다.",
};

const OPERATOR = {
  SUM: "+",
  SUB: "-",
  MULTI: "X",
  DIV: "/",
  EQUAL: "=",
};

const VALUE = {
  DEFAULT_VALUE: 0,
  DIGIT_LIMIT_LENGTH: 3,
};

export { BUTTON_TYPE, ERROR_MESSAGES, OPERATOR, VALUE };

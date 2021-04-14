export const MAXIMUM_DIGITS_LENGTH = 3;
export const INITIAL_VALUE = "0";

export const PLUS = "+";
export const MINUS = "-";
export const MULTIPLICATION = "X";
export const DIVISION = "/";

export const OPERATORS = [PLUS, MINUS, MULTIPLICATION, DIVISION];

export const MESSAGE = {
  INVALID_DIGIT_LENGTH: `숫자는 최대 ${MAXIMUM_DIGITS_LENGTH}자리까지만 입력 가능합니다.`,
  INVALID_OPERATOR_INPUT: "연산자는 한번에 하나만 입력 가능합니다.",
  CHECK_INPUT_TYPE: "올바른 숫자를 입력하셨는지 확인해주세요.",
  NEED_ENTER_NUMBER: "숫자를 먼저 입력해주세요.",
  NEED_OPERATOR: "계산을 하기 위해서는 연산자가 필요합니다.",
  IS_NOT_NUMBER: "숫자 아님",
};

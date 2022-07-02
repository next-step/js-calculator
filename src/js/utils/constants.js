export const MAX_DIGIT_LENGTH = 3;
export const INITAL_VALUE = "0";

export const ADD = "+";
export const SUB = "-";
export const MUL = "X";
export const DIV = "/";
export const EQU = "=";
export const AC = "AC";
export const OPERATORS = [ADD, SUB, MUL, DIV, EQU, AC];

export const ERROR_MESSAGES = {
  INVALID_DIGIT_LENGTH: `숫자는 최대 ${MAX_DIGIT_LENGTH}자리까지만 입력 가능합니다!`,
  INVALID_INPUT: "숫자를 먼저 입력해 주세요!",
};

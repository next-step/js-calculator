export const MAX_LENGTH = 3;

export const OPERATORS = Object.freeze(['/', 'X', '-', '+', '=']);

export const INPUT_TYPE = Object.freeze({
  DIGIT: 'DIGIT',
  OPERATION: 'OPERATION',
});

export const ERR_MESSAGE = Object.freeze({
  OVER_NUMBER: '숫자는 세 자리까지만 입력 가능합니다!',
  NONE_NUMBER: '숫자를 먼저 입력한 후 연산자를 입력해주세요!',
});

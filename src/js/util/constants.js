export const PLUS = '+';
export const MINUS = '-';
export const MULTIPLICATION = 'X';
export const DIVISION = '/';
export const OPERATORS = [PLUS, MINUS, MULTIPLICATION, DIVISION];

export const MAX_NUMBERS = 2;
export const MAX_NUMBER_LENGTH = 3;

export const MSG = {
  EXCEED_NUMBER_LENGTH: `숫자는 한번에 최대 ${MAX_NUMBER_LENGTH}자리 수까지 입력 가능합니다.`,
  EXCEED_NUMBER_OF_NUMBERS: `${MAX_NUMBERS}개의 숫자에 대해 연산이 가능합니다.`,
  DIVISION_0: '0으로 나눌 수 없습니다.',
  IMPERFECT_EXPRESSION: '완성되지 않은 수식입니다',
};

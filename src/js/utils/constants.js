'use strict';

export const PLUS = '+';
export const MINUS = '-';
export const MULTIPLICATION = 'X';
export const DIVISION = '/';

export const OPERATORS = [PLUS, MINUS, MULTIPLICATION, DIVISION];

export const MESSAGE = Object.freeze({
  MAX_NUMBER: '숫자는 세 자리까지만 입력 가능합니다!',
  MAX_OPERATION: '연산 기호는 1개만 입력 가능합니다!',
});

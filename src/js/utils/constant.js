import { $ } from './querySelector';

export const DISPLAY = $('#total');

export const MAX_DIGIT_LENGTH = 3;
export const INITIAL_VALUE = '0';

const PLUS = '+';
const MINUS = '-';
const MULTIPLICATION = 'X';
const DIVISION = '/';

export const OPERATORS = [PLUS, MINUS, MULTIPLICATION, DIVISION];

export const MESSAGE = {
  INVALID_DIGIT_LENGTH: `숫자는 최대 ${MAX_DIGIT_LENGTH}자리까지만 입력 가능합니다.`,
  INVALID_OPERATOR_INPUT: '연산자는 한번에 하나만 입력 가능합니다.',
  NEED_ENTER_NUMBER: '숫자를 먼저 입력해주세요.',
};

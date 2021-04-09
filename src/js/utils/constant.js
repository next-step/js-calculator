import { $ } from './querySelector';

export const DISPLAY = $('#total');
export const MAX_DIGIT_LENGTH = 3;

const PLUS = '+';
const MINUS = '-';
const MULTIPLICATION = '*';
const DIVISION = '/';

export const OPERATORS = [PLUS, MINUS, MULTIPLICATION, DIVISION];

export const MESSAGE = {
  INVALID_DIGIT_LENGTH: `숫자는 최대 ${MAX_DIGIT_LENGTH}자리까지만 입력 가능합니다.`,
};

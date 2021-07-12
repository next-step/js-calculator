import $ from '../utils/util.js'
const DISPLAY = $('#total');
const OPERATOR_OBJ = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  'X': (a, b) => a * b,
  '/': (a, b) => Math.floor(a / b),
}
const OPERATOR_ARR = Object.keys(OPERATOR_OBJ);

const MAX_NUMBERS_LENGTH = 3;

export { DISPLAY, OPERATOR_OBJ, OPERATOR_ARR, MAX_NUMBERS_LENGTH };

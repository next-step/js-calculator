import { $ } from './utils/util.js';
import Calculator from './services/calculator.js';

const calculator = new Calculator();

window.addEventListener('load', () => {
  const $digits = $('.digits');
  const $modifier = $('.modifier');
  const $operations = $('.operations');

  $digits.addEventListener('click', calculator.clickNumber.bind(calculator));
  $operations.addEventListener('click', calculator.clickOperation.bind(calculator));
  $modifier.addEventListener('click', calculator.clickAllClear.bind(calculator));
});

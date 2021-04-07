import { putNumber } from './srcs/putNumber.js';
import { putOperator } from './srcs/putOperator.js';
import { putResult } from './srcs/putResult.js';
import { clearDisplay } from './srcs/clearDisplay.js';

export default function Calculator() {
  const $digits = document.querySelector('.digits');
  const $operations = document.querySelector('.operations');
  const $equalSign = document.querySelector('#equal-sign');
  const $modifier = document.querySelector('.modifier');

  $digits.addEventListener('click', putNumber);
  $operations.addEventListener('click', putOperator);
  $equalSign.addEventListener('click', putResult);
  $modifier.addEventListener('click', clearDisplay);
}

window.onload = () => {
  new Calculator();
};

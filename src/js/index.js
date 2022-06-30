import clearResult from './clearResult.js';
import enterNumber from './enterNumber.js';
import enterOperator from './enterOperator.js';

export const totalDisplayText = document.getElementById('total');
const numbers = document.querySelector('.digits');
const modifier = document.querySelector('.modifier');
const operations = document.querySelector('.operations');

const init = () => {
  numbers.addEventListener('click', enterNumber);
  modifier.addEventListener('click', clearResult);
  operations.addEventListener('click', enterOperator);
};

window.onload = () => {
  init();
};

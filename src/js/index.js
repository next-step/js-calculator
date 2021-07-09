import { $ } from '../util.js';

function clickNumber({ target }) {
  console.log('click', target.textContent);
}

const clickOperation = ({ target }) => {
  console.log('click', target.textContent);
};

const clickAllClear = ({ target }) => {
  console.log('click', target.textContent);
};

console.log('Hello JS');

const $digits = $('.digits');
const $modifier = $('.modifier');
const $operations = $('.operations');

$digits.addEventListener('click', clickNumber);
$operations.addEventListener('click', clickOperation);
$modifier.addEventListener('click', clickAllClear);

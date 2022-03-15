import { onClickClear } from './srcs/pushClear.js';
import { onClickDigit } from './srcs/pushNumber.js';
import { onClickOperation } from './srcs/pushOperator.js';

const $digit = document.querySelectorAll('.digit');
const $modifier = document.querySelector('.modifiers');
const $operations = document.querySelector('.operations');

$digit.forEach(number => {
    number.addEventListener('click', onClickDigit);
})
$modifier.addEventListener('click', onClickClear);
$operations.addEventListener('click', onClickOperation);
import { $ } from '../util.js';

const stack = [];
const calculate = {
  '+': (number1, number2) => number1 + number2,
  '-': (number1, number2) => number1 - number2,
  X: (number1, number2) => number1 * number2,
  '/': (number1, number2) => parseInt(number1 / number2),
};

function clickNumber({ target }) {
  const number = target.textContent;
  if (stack.length === 0 || !/\d+/.test(stack[stack.length - 1])) {
    stack.push(number);
    console.log(stack);
    return;
  } else {
    let value = stack.pop();
    console.log(value, /\d+/gi.test(value));
    if (/\d+/.test(value)) {
      if (value.length >= 3) {
        stack.push(value);
        alert('숫자는 3글자까지만 가능');
        return;
      }
      value = '' + value + number;
      stack.push(value);
    } else {
      stack.push(value);
    }
  }

  console.log(stack);
}

const clickOperation = ({ target }) => {
  const operation = target.textContent;

  if (operation === '=') {
    console.log(stack);
    const number2 = stack.pop();
    const oper = stack.pop();
    const number1 = stack.pop();

    console.log(number1, oper, number2, '=', calculate[oper](+number1, +number2));

    stack.push(calculate[oper](+number1, +number2));

    console.log(stack);

    return;
  }

  if (stack.length === 0 && operation !== '=') {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return;
  }

  console.log(stack, operation);
  stack.push(operation);
  console.log(stack, operation);

  console.log('click', target.textContent);
};

const clickAllClear = ({ target }) => {
  while (stack.length) {
    stack.pop();
  }
  console.log('click', target.textContent, stack);
};

console.log('Hello JS');

const $digits = $('.digits');
const $modifier = $('.modifier');
const $operations = $('.operations');

$digits.addEventListener('click', clickNumber);
$operations.addEventListener('click', clickOperation);
$modifier.addEventListener('click', clickAllClear);

console.log(stack);

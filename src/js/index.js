import { $ } from '../util.js';

const stack = [];
const calculate = {
  '+': (number1, number2) => number1 + number2,
  '-': (number1, number2) => number1 - number2,
  X: (number1, number2) => number1 * number2,
  '/': (number1, number2) => parseInt(number1 / number2),
};

function renderTotal() {
  let text = '';
  for (let i = 0; i < stack.length; i++) {
    text += stack[i];
  }
  console.log(text);
  $total.textContent = text === '' ? 0 : text;
}

function clickNumber({ target }) {
  const number = target.textContent;
  if (stack.length === 0 || !/\d+/.test(stack[stack.length - 1])) {
    stack.push(number);
    renderTotal();
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

      if (value == 0) value = '';
      value = '' + value + number;
      stack.push(value);
      renderTotal();
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
    if (stack.length < 3) {
      if (!/\d+/gi.test(stack[stack.length - 1])) stack.pop();
      renderTotal();

      return;
    }
    const number2 = stack.pop();
    const oper = stack.pop();
    const number1 = stack.pop();

    const result = calculate[oper](+number1, +number2);
    console.log(number1, oper, number2, '=', result);
    stack.push(result);
    renderTotal();

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
  renderTotal();
};

const clickAllClear = ({ target }) => {
  while (stack.length) {
    stack.pop();
  }
  console.log('click', target.textContent, stack);
  renderTotal();
};

console.log('Hello JS');

const $digits = $('.digits');
const $modifier = $('.modifier');
const $operations = $('.operations');
const $total = $('#total');
// console.log($total);

$digits.addEventListener('click', clickNumber);
$operations.addEventListener('click', clickOperation);
$modifier.addEventListener('click', clickAllClear);

console.log(stack);

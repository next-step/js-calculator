import Calculator from './calculator.js';

const total = document.querySelector('#total');
const calculator = document.querySelector('.calculator');
let input = '';
const MAXIMUM_DIGITS = 3;

calculator.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  input += e.target.innerText;

  if (e.target.innerText === 'AC') {
    total.innerText = '0';
    input = '';
    return;
  }

  const continuedCharacters = /[X/+-]{2,}/;
  if (continuedCharacters.test(input)) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    input = input.slice(0, -1);
    return;
  }

  if (input.includes('=')) {
    input = input.replace('=', '');
  }

  const regex = /[X/+-]/gi;
  const [num1, num2] = input.split(regex);

  if (
    (num1 && num1.length > MAXIMUM_DIGITS) ||
    (num2 && num2.length > MAXIMUM_DIGITS)
  ) {
    alert('세자리 숫자까지만 입력이 가능합니다.');
    input = input.slice(0, -1);
    return;
  }

  switch (e.target.className) {
    case 'digit':
      if (input[0] === '0') {
        input = '';
        return;
      }
      break;

    case 'operation':
      if (
        input[0] === '/' ||
        input[0] === 'X' ||
        input[0] === '-' ||
        input[0] === '+' ||
        input[0] === '='
      ) {
        alert('계산식은 문자 다음에 입력이 가능합니다.');
        input = '';
        return;
      }

      if (e.target.innerText === '=') {
        const calc = new Calculator(num1, num2);

        if (input.includes('+')) {
          input = calc.sum();
        } else if (input.includes('-')) {
          input = calc.substract();
        } else if (input.includes('X')) {
          input = calc.multiply();
        } else if (input.includes('/')) {
          input = calc.divide();
        }
      }

      break;

    case 'modifier':
      input = '0';
      break;

    default:
      input = '';
      break;
  }

  total.innerText = input;
});

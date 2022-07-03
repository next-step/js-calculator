import { Calculator } from './calculator.js';

const total = document.querySelector('#total');
const calculator = document.querySelector('.calculator');
let input = '';

calculator.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  if (e.target.innerText === 'AC') {
    total.innerText = '0';
    input = '';
    return;
  }

  input += e.target.innerText;

  if (input.includes('=')) {
    input = input.replace('=', '');
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
        const seperator = /[X/+-]/gi;
        const numbers = input.split(seperator);
        const num1 = numbers[0];
        const num2 = numbers[1];
        const calc = new Calculator(num1, num2);

        if (input.includes('+')) {
          input = calc.add();
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
      break;
  }

  total.innerText = input;
});

import Calculator from './calculator.js';

const total = document.querySelector('#total');
const calculator = document.querySelector('.calculator');
let input = '';

calculator.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  input += e.target.innerText;

  // AC 버튼 클릭 시 초기화
  if (e.target.innerText === 'AC') {
    total.innerText = '0';
    input = '';
    return;
  }

  // 계산에 관한 문자가 연속으로 입력되지 않도록
  const continuedCharacters = /[X/+-]{2,}/;
  if (continuedCharacters.test(input)) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    input = input.slice(0, -1);
    return;
  }

  // input 값에 '=' 문자열은 포함 시키지 않도록
  if (input.includes('=')) {
    input = input.replace('=', '');
  }

  // 입력 숫자가 3자리를 넘어가면 경고문구
  const regex = /[X/+-]/gi;
  const numbers = input.split(regex);
  let num1 = numbers[0];
  let num2 = numbers[1];

  if ((num1 && num1.length >= 4) || (num2 && num2.length >= 4)) {
    alert('세자리 숫자까지만 입력이 가능합니다.');
    input = input.slice(0, -1);
    return;
  }

  switch (e.target.className) {
    case 'digit':
      // 최초 0 값은 입력이 불가
      if (input[0] === '0') {
        input = '';
        return;
      }
      break;

    case 'operation':
      // 최초 계산식에 관한 입력은 불가
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

      // = 이 클릭되면 계산이 되도록
      if (e.target.innerText === '=') {
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

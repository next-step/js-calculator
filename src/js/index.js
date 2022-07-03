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
      break;

    case 'modifier':
      input = '0';
      break;

    default:
      break;
  }

  total.innerText = input;
});

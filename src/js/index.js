const calculator = document.querySelector('.calculator');
const total = document.querySelector('#total');
const modifier = document.querySelector('.modifier');
const buttons = document.getElementsByClassName('digit');
const operations = document.getElementsByClassName('operation');

let num1 = 0;
let opertaion = null;

function addNumber(e) {
  if (total.innerText === '0') {
    total.innerText = e.target.innerText;
  } else if (total.innerText.length + 1 <= 3) {
    total.innerText += e.target.innerText;
  }
}

function resetNumber() {
  total.innerText = '0';
}

function operateNumber(e) {
  let selected = e.target.innerText;
  console.log(opertaion);
  switch (selected) {
    case '+':
      num1 = Number(total.innerText);
      operation = selected;
      break;
    case '-':
      console.log('빼기');
      break;
    case 'X':
      console.log('곱하기');
      break;
    case '/':
      console.log('나누기');
      break;
    case '=':
      console.log('는?');
      break;
    default:
      console.error('없는 연산자');
      break;
  }
  console.log(opertaion);
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', addNumber);
}

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener('click', operateNumber);
}

modifier.addEventListener('click', resetNumber);

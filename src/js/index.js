const digits = document.querySelector('.digits');
const operations = document.querySelector('.operations');
const total = document.getElementById('total');
let tempNumString = '';
const calculatorParam = [];

function onClickDigit(e) {
  if (!e.target.classList.contains('digit')) return;

  if (tempNumString.length === 3) {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
    return false;
  }
  const inputValue = e.target.innerText;

  if (tempNumString === '' && inputValue === '0') {
    return false;
  }

  tempNumString += inputValue;
  displayInputValue(inputValue);
}

function getCalculationResult() {
  switch (calculatorParam.length) {
    case 1: {
      total.innerText = calculatorParam[0];
      break;
    }
    case 2: {
      if (tempNumString === '') {
        total.innerText = calculatorParam[0];
        break;
      } else {
        calculatorParam.push(parseInt(tempNumString));
        tempNumString = '';
      }
    }
    case 3: {
      const result = calculator(...calculatorParam);
      total.innerText = result;
      tempNumString = result;
      calculatorParam.length = 0;
    }
  }
  return false;
}

function onClickOperation(e) {
  if (!e.target.classList.contains('operation')) return;

  const inputValue = e.target.innerText;

  if (inputValue === '=') {
    getCalculationResult();
    return false;
  }

  if (tempNumString.length === 0) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return false;
  }

  if (calculatorParam.length === 3 || (calculatorParam.length === 2 && num !== '')) {
    alert('2개의 숫자에 대해서만 계산 가능합니다.');
    return false;
  }

  calculatorParam.push(parseInt(tempNumString));
  calculatorParam.push(inputValue);
  tempNumString = '';
  displayInputValue(inputValue);
}

function calculator(first, operator, second) {
  switch (operator) {
    case '/':
      return Math.floor(first / second);
    case 'X':
      return first * second;
    case '-':
      return first - second;
    case '+':
      return first + second;
    default:
      return;
  }
}

function displayInputValue(text) {
  const currentTotal = total.innerText;
  total.innerText = currentTotal === '0' ? text : currentTotal + text;
}

function reset() {
  total.innerText = '0';
  tempNumString = '';
  calculatorParam.length = 0;
}

function init() {
  digits.addEventListener('click', onClickDigit);
  operations.addEventListener('click', onClickOperation);
  document.querySelector('.modifier').addEventListener('click', reset);
}

init();

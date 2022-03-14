import { MAX_DIGIT_LENGTH, CHECK_NUMBER_REGEX } from './consts.js';

const $total = document.querySelector('#total');
const $digits = document.querySelectorAll('.digits');
const $operations = document.querySelectorAll('.operation');
const $modifier = document.querySelector('.modifiers');
const $equalButton = document.querySelector('.operations :nth-child(5)');

let totalState = '';
let operatorState = '';

const handleClickDigitButton = (e) => {
  if (totalState === '0') {
    totalState = e.target.innerText;
  } else {
    totalState += e.target.innerText;
  }

  if (totalState.length > MAX_DIGIT_LENGTH) {
    return alert('3자리 이하로 입력하세요');
  }

  $total.innerText = totalState;
};

const handleClickOperatorButton = (e) => {
  if (operatorState) {
    return alert('두 개의 숫자만 연산할 수 있습니다.');
  }

  operatorState = e.target.innerText;
  totalState += e.target.innerText;
  $total.innerText = totalState;
};

const handleClickModifierButton = () => {
  totalState = '0';
  $total.innerText = totalState;
  operatorState = '';
};

const calculateTwoNumber = (number1, number2) => {
  if (operatorState === '+') {
    return (number1 + number2).toFixed();
  }
  if (operatorState === '-') {
    return (number1 - number2).toFixed();
  }
  if (operatorState === 'X') {
    return (number1 * number2).toFixed();
  }
  if (operatorState === '/') {
    return (number1 / number2).toFixed();
  }
};

const handleClickEqualButton = () => {
  const [number1, number2] = totalState.split(CHECK_NUMBER_REGEX).map((str) => +str);

  const calculatedResult = calculateTwoNumber(number1, number2);

  totalState = calculatedResult;
  $total.innerText = totalState;
  operatorState = '';
};

$digits.forEach((digit) => {
  digit.onclick = handleClickDigitButton;
});

$operations.forEach((operation) => {
  operation.onclick = handleClickOperatorButton;
});

$modifier.onclick = handleClickModifierButton;
$equalButton.onclick = handleClickEqualButton;

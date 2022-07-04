import Calculator from './Calculator.js';

const calc = new Calculator();

const total = document.getElementById('total');
const setTotal = (value) => {
  total.innerText = value;
};

const modifier = document.querySelector('.modifier');
const clickAC = () => {
  calc.handleAC();
  setTotal(calc.expression);
};
modifier.addEventListener('click', clickAC);

const digits = document.querySelector('.digits');
const clickDigit = (event) => {
  const digit = event.target.innerText;
  calc.handleDigit(digit);
  setTotal(calc.expression);
};
digits.addEventListener('click', clickDigit);

const operations = document.querySelector('.operations');
const clickOperation = (event) => {
  const operation = event.target.innerText;
  calc.handleOperation(operation);
  setTotal(calc.expression);
};
operations.addEventListener('click', clickOperation);

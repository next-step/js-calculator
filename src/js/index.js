import Calculator from './Calculator.js';

const calc = new Calculator();

const total = document.getElementById('total');
const modifier = document.querySelector('.modifier');
const digits = document.querySelector('.digits');
const operations = document.querySelector('.operations');

const setTotal = (value) => {
  total.innerText = value;
};

const handleAc = () => {
  calc.handleAC();
  setTotal(calc.expression);
};

const handleDigit = (event) => {
  const digit = event.target.innerText;
  calc.handleAppendDigit(digit);
  setTotal(calc.expression);
};

const handleOperation = (event) => {
  const operation = event.target.innerText;
  calc.handleOperation(operation);
  setTotal(calc.expression);
};

const _addEventListener = () => {
  modifier.addEventListener('click', handleAc);
  digits.addEventListener('click', handleDigit);
  operations.addEventListener('click', handleOperation);
};

_addEventListener();

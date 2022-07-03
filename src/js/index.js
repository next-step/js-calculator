let currentOperation = '';

const total = document.getElementById('total');
const setTotal = (value) => {
  total.innerText = value;
};
const getTotal = () => {
  return total.innerText;
};

const digits = document.querySelector('.digits');
const clickDigit = (event) => {
  const digit = event.target.innerText;
  if (getTotal() === '0') {
    setTotal(digit);
  } else {
    setTotal(getTotal() + digit);
  }
};
digits.addEventListener('click', clickDigit);

const operations = document.querySelectorAll('.operation');
const clickOperation = (event) => {
  const operation = event.target.innerText;
  currentOperation = operation;
  setTotal(getTotal() + operation);
};
for (let i = 0; i < operations.length - 1; i++) {
  operations[i].addEventListener('click', clickOperation);
}
const equal = document.querySelector('.operation:last-child');
const clickEqualOperation = () => {
  calculateExpression(getTotal());
};
equal.addEventListener('click', clickEqualOperation);

const calculateExpression = (expression) => {
  const numbers = expression.split(currentOperation);
  const firstNumber = parseInt(numbers[0]);
  const secondNumber = parseInt(numbers[1]);
  setTotal(calculate(firstNumber, secondNumber));
};

const calculate = (firstNum, secondNum) => {
  return plus(firstNum, secondNum);
};

const plus = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

import Calculator from './calculator.js';

const $calculator = document.querySelector('.calculator');

const calculator = new Calculator();

$calculator.addEventListener('click', (event) => {
  try {
    calculator.routeEvent(event);
  } catch (err) {
    alert(err.message);
  }
});

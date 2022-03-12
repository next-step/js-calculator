import { clearCalculator } from './service';

const $setTotal = (value) => {
  document.getElementById('total').textContent = value;
};

const controller = (calculator) => {
  const $modifier = document.querySelector('.modifier');

  $modifier.addEventListener('click', () => {
    clearCalculator(calculator);
    $setTotal(calculator.total);
  });
};

export default controller;

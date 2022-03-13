import { operations } from './model';

const controller = (calculator) => {
  const $digits = document.querySelector('.digits');
  const $operations = document.querySelector('.operations');
  const $modifier = document.querySelector('.modifier');

  $digits.addEventListener('click', (e) => {
    const value = e.target.textContent;
    calculator.input(value);
  });

  $operations.addEventListener('click', (e) => {
    const value = e.target.textContent;

    if (e.target.textContent === operations.CALCULATE) calculator.calculate();
    else calculator.input(value);
  });

  $modifier.addEventListener('click', () => {
    calculator.allClear();
  });
};

export default controller;

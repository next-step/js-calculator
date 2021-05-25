import '../css/index.css';
import { $ } from './utils/querySelector';
import { handleCalculatorInput } from './handler/handleCalculatorInput';

const calculator = () => {
  const $calculator = $('.calculator');

  $calculator.addEventListener('click', handleCalculatorInput);
};

window.addEventListener('DOMContentLoaded', () => {
  calculator();
});

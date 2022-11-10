import Calculator from './Calculator.js';
import { listeners } from './ui.js';

window.addEventListener('load', function () {
  const calculator = new Calculator();
  const total = document.querySelector('#total');
  Object.keys(listeners).forEach((listener) =>
    listeners[listener]({ total, calculator })
  );
});

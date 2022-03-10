import Calculator from './Calculator.js';
import View from './View.js';

const rootElement = document.querySelector('#app');
const calculator = new Calculator();

new View(rootElement, calculator);

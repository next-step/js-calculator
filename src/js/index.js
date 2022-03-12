import Calculator from './Calculator.js';
import View from './View.js';

const rootElement = document.querySelector('#app');
const calculator = new Calculator();
const view = new View(rootElement, calculator);
view.initialize();

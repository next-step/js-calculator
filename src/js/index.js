import Calculator from './Calculator.js';
import Validator from './Validator.js';
import View from './View.js';

const rootElement = document.querySelector('#app');
const validator = new Validator();
const calculator = new Calculator(validator);
const view = new View(rootElement, calculator);

view.initialize();

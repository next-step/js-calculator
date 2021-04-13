import Calculator from './calculator.js';

const container = document.body.getElementsByClassName('calculator')[0];
const app = new Calculator(container);
app.init();

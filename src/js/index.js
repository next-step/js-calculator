import { onButtonClick, onModifierClick } from './handler.js';

const total = document.getElementById('total');
const modifier = document.querySelector('.modifier');
const digitButtons = document.querySelectorAll('.digit');
const operationButtons = document.querySelectorAll('.operation');

const buttons = [...digitButtons, ...operationButtons];

buttons.forEach((button) => {
  button.addEventListener('click', onButtonClick);
});

modifier.addEventListener('click', onModifierClick);

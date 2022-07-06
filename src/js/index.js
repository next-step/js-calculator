import init from './init.js';

const total = document.getElementById('total');
const modifier = document.querySelector('.modifier');
const digitButtons = document.querySelectorAll('.digit');
const operationButtons = document.querySelectorAll('.operation');

init({
  ViewElement: total,
  AllClearElement: modifier,
  digitElements: digitButtons,
  operationElements: operationButtons,
});

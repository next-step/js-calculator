import { insertNumber, insertOperator, allClear } from './app.js';

const digitBtn = document.getElementById('num');
export const totalInput = document.getElementById('total');
const resetBtn = document.getElementById('ac');
const operatorBtn = document.getElementById('operator');

digitBtn.addEventListener('click', insertNumber);
operatorBtn.addEventListener('click', insertOperator);
resetBtn.addEventListener('click', allClear);

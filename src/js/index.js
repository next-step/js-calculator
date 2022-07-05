import calculator from './calculator.mjs';

const digitsEl = document.querySelector('.digits');
const operationsEl = document.querySelector('.operations');
const acEl = document.querySelector('.modifiers');
const totalEl = document.querySelector('#total');

const executeAlert = (text) => alert(text);
calculator.setAlert(executeAlert);

const renderText = (text) => {
  totalEl.textContent = text;
};
calculator.setRenderText(renderText);

const getText = (event) => event.target.textContent;

const handleClickDigits = (e) => {
  const text = getText(e);
  calculator.setNumber(text);
};

const handleClickOperation = (e) => {
  const text = getText(e);
  calculator.setOperation(text);
};

const handleClickAllClear = () => {
  calculator.clear();
};

digitsEl.addEventListener('click', handleClickDigits);
operationsEl.addEventListener('click', handleClickOperation);
acEl.addEventListener('click', handleClickAllClear);

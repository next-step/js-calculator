import createValue from './state.js'
import render from './render.js';
import { selector } from './lib.js';
import { operatorValidator, digitValidator } from './validator.js';
import { calculate } from './operators.js';

const [value, onChangeValue, resetValue] = createValue();

const total = selector('#total');
const digits = selector('.digits');
const operators = selector('.operations');
const modifier = selector('.modifier');

function handleDigit(e) {
  const validator = digitValidator(value);
  if (!validator.isValid){
    return window.alert(validator.msg);
  }
  const digit = e.target.innerText;

  onChangeValue(digit);
  
  return render(total, value);
}

function handleOperators(e) {
  const operator = e.target.innerText;
  if (operator === '=') {
    const result = calculate(value);

    resetValue();

    onChangeValue(result);

    return render(total, value);
  }

  const validator = operatorValidator(value, operator)
  if (!validator.isValid) {
    return window.alert(validator.msg);
  }

  onChangeValue(operator);
  return render(total, value);
}

function handleModifier() {
  resetValue();
  return render(total);
}

digits.addEventListener('click', handleDigit);
operators.addEventListener('click', handleOperators);
modifier.addEventListener('click', handleModifier);

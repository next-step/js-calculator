import { selector } from './lib.js';
import useState from './state.js'
import render from './render.js';
import { operatorValidator, digitValidator, calculrateValidator } from './validator.js';
import { calculate } from './operators.js';

const [state, setState, resetState] = useState();

const total = selector('#total');
const digits = selector('.digits');
const operators = selector('.operations');
const modifier = selector('.modifier');

function handleDigit(e) {
  const a = digitValidator(state);
  if (!a.isValid){
    return window.alert(a.msg);
  }
  const digit = e.target.innerText;
  setState(digit);
  render(total, state);
}

function handleOperators(e) {
  const operator = e.target.innerText;
  const validator = operatorValidator(state, operator)
  if (!validator.isValid) {
    return window.alert(validator.msg);
  }

  if (operator === '=') {
    const validator = calculrateValidator(state);
    if (!validator.isValid) {
      return window.alert(validator.msg);
    }
    const result = calculate(state);
    resetState();
    setState(result);
    return render(total, [result]);
  }

  setState(operator);
  render(total, state);
}

function handleModifier() {
  resetState();
  render(total);
}

digits.addEventListener('click', handleDigit);
operators.addEventListener('click', handleOperators);
modifier.addEventListener('click', handleModifier);

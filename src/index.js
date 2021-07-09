import { addEvent, qs } from './helpers.js';
import { BUTTON } from './constants.js';
import { allClear, putNumber, putOperator } from './Calculator.js';

const init = () => {
  const $calculator = qs('.calculator');

  return addEvent($calculator, 'click', handleClick);
};

const handleClick = ({ target }) => {
  const cb = {
    [BUTTON.DIGIT]: putNumber,
    [BUTTON.OPERATION]: putOperator,
    [BUTTON.MODIFIER]: allClear,
  }[target.className];

  if (!cb) return;

  return cb(target.innerText);
};

init();

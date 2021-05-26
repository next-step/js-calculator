import { $on, qs } from './utils/helpers.js';
import { EVENT_TYPE } from './utils/constants.js';

export default function calculator() {
  const setOperand = (digit) => {
    console.log(digit);
  };

  const setOperator = (op) => {
    console.log(op);
  };

  const allClear = () => {
    console.log('all clear');
  };

  const eventHandling = ({ target }) => {
    const button = target.closest('button');
    if (!button) return;
    const option = {
      digit: setOperand,
      modifier: allClear,
      operation: setOperator,
    };
    option[button.className](button.innerText);
  };

  const $calculator = qs('.calculator');
  $on($calculator, EVENT_TYPE.CLICK, eventHandling);
}

import { $on, qs } from './utils/helpers.js';
import Screen from './screen.js';

export default function calculator() {
  const $calculator = qs('.calculator');
  const screen = new Screen(qs('#total'));

  const eventHandling = ({ target }) => {
    const button = target.closest('button');
    if (!button) return;
    const option = {
      digit: screen.setOperand,
      operation: screen.setOperator,
      modifier: screen.allClear,
    };
    option[button.className](button.innerText);
  };

  $on($calculator, 'click', eventHandling);
}

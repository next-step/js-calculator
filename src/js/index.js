import { $on, qs } from './utils/helpers.js';
import { EVENT_TYPE } from './utils/constants.js';

function Calculator() {
  const eventHandling = ({target}) => {
    const button = target.closest('button');
    if (!button) return ;
    if (button.classList.contains('digit')) {
      // TODO: 수 버튼을 누르면 어떤 동작을 할건데?
      console.log(button);
    } else if (button.classList.contains('modifier')) {
      // TODO: all-clear
    } else {
      // TODO: button
    }
  }

  const calculator = qs('.calculator');
  $on(calculator, EVENT_TYPE.CLICK, (event) => eventHandling(event));
  calculator.addEventListener
}

Calculator();
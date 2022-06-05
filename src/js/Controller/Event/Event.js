import { selector } from '../../util/consts.js';
import Controller from '../Controller.js';

const Event = (function () {
  return {
    keypad: {
      attachEvent() {
        selector('#keypad').addEventListener('click', (event) => {
          const classTypeChecker = (event, type) => {
            return [...event.target.classList].includes(type);
          };

          if (classTypeChecker(event, 'digit'))
            Controller.digit.seperateDigitProcess(event);

          if (classTypeChecker(event, 'operation'))
            Controller.operation.seperateOperationProcess(event);

          if (classTypeChecker(event, 'modifier')) Controller.modifier.reset();
        });
      },
    },
  };
})();

export default Event;

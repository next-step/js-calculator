import TotalPad from './components/TotalPad.js';
import DigitSection from './components/DigitSection.js';
import ModifiersSection from './components/ModifiersSection.js';
import OperationSection from './components/OperationSection.js';

import {
  INPUT_TYPE,
  OPERATORS,
  ERR_MESSAGE,
  MAX_LENGTH,
} from './utils/constants.js';

import { calcOperation } from './utils/operation.js';

class App {
  // Dom target
  #target;

  // State
  #state = {
    inputStack: Array(3),
    currentInput: {
      type: INPUT_TYPE.DIGIT,
      value: '',
    },
  };

  // Components
  #totalPad;
  #digitSection;
  #modifiersSection;
  #operationSection;

  constructor($target) {
    this.#target = $target;

    const $calculator = document.createElement('div');
    $calculator.className = 'calculator';

    this.#totalPad = new TotalPad($calculator);

    this.#digitSection = new DigitSection($calculator, {
      onClick: e => {
        const value = e.target.dataset.value;

        if (
          this.#state.currentInput.type === INPUT_TYPE.DIGIT &&
          this.#state.currentInput.value.length === MAX_LENGTH
        ) {
          return alert(ERR_MESSAGE.OVER_NUMBER);
        }

        this.#state.currentInput.type = INPUT_TYPE.DIGIT;

        if (this.#state.currentInput.value === '0') {
          this.#state.currentInput.value = value;
        } else {
          this.#state.currentInput.value += value;
        }

        if (!this.#state.inputStack[1]) {
          this.#state.inputStack[0] = this.#state.currentInput;
        } else {
          this.#state.inputStack[2] = this.#state.currentInput;
        }

        console.log(this.#state.currentInput);
        console.log(this.#state.inputStack);

        this.#totalPad.updateText({
          display: this.#state.inputStack.map(item => item.value).join(''),
        });
      },
    });

    this.#modifiersSection = new ModifiersSection($calculator, {
      onClick: () => {
        this.#state = {
          inputStack: Array(3),
          currentInput: {
            type: INPUT_TYPE.DIGIT,
            value: '',
          },
        };
        this.#totalPad.updateText({ display: '0' });
      },
    });

    this.#operationSection = new OperationSection($calculator, {
      OPERATORS,
      onClick: e => {
        if (this.#state.currentInput.type === INPUT_TYPE.OPERATION) {
          return alert(ERR_MESSAGE.NONE_NUMBER);
        }

        const value = e.target.dataset.value;

        if (value === '=') {
          const operate = calcOperation(
            this.#state.inputStack[0].value,
            this.#state.inputStack[2].value
          );

          const result = operate[this.#state.inputStack[1].value]();
          this.#totalPad.updateText({
            display: result,
          });

          this.#state = {
            inputStack: Array(3).fill(result, 0, 1),
            currentInput: {
              type: INPUT_TYPE.DIGIT,
              value: '',
            },
          };
          return;
        }

        this.#state.inputStack[1] = {
          type: INPUT_TYPE.OPERATION,
          value,
        };

        this.#state.currentInput = {
          type: INPUT_TYPE.OPERATION,
          value: '',
        };

        this.#totalPad.updateText({
          display: this.#state.inputStack.map(item => item.value).join(''),
        });
      },
    });

    this.#target.appendChild($calculator);
  }
}

const $app = document.querySelector('#app');
new App($app);

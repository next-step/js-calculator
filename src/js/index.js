import TotalPad from './components/TotalPad.js';
import DigitSection from './components/DigitSection.js';
import ModifiersSection from './components/ModifiersSection.js';
import OperationSection from './components/OperationSection.js';


const Operation = (a, b) => {
  return {
    ['/']: () => a / b,
    ['X']: () => a * b,
    ['-']: () => a - b,
    ['+']: () => a + b,
  };
};

class App {
  // Dom target
  #target;

  // State
  #state = {
    inputStack: Array(3),
    currentInput: {
      type: 'DIGIT',
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
          this.#state.currentInput.type === 'DIGIT' &&
          this.#state.currentInput.value.length === 3
        ) {
          return alert('숫자는 세 자리까지만 입력 가능합니다!');
        }

        this.#state.currentInput.type = 'DIGIT';

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
            type: 'DIGIT',
            value: '',
          },
        };
        this.#totalPad.updateText({ display: '0' });
      },
    });

    this.#operationSection = new OperationSection($calculator, {
      onClick: e => {
        if (this.#state.currentInput.type === 'OPERATION') {
          return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
        }

        const value = e.target.dataset.value;

        if (value === '=') {
          const operate = Operation(
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
              type: 'DIGIT',
              value: '',
            },
          };
          return;
        }

        this.#state.inputStack[1] = {
          type: 'OPERATION',
          value,
        };

        this.#state.currentInput = {
          type: 'OPERATION',
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

import {
  CALCULATOR_INIT_VALUE,
  CALCULATOR_SYMBOLS,
  CALCULATOR_DIGIT_MAX_LENGTH,
  CALCULATOR_SYMBOL_EQUAL,
} from './constants.js';
import { calculate } from './calculator.js';

class App {
  /** @type {HTMLDivElement} */
  #element;
  /** @type {HTMLHeadingElement} */
  #totalElement;
  /** @type {boolean} */
  #isCalculateAfter = false;

  /**
   * @param {HTMLDivElement} element
   */
  constructor(element) {
    this.#element = element;
    this.#render();
    this.#mounted();
  }

  #render() {
    this.#element.innerHTML = `
        <div class="calculator">
            <h1 id="total">${CALCULATOR_INIT_VALUE}</h1>
            <div class="digits flex">
                <button class="digit">9</button>
                <button class="digit">8</button>
                <button class="digit">7</button>
                <button class="digit">6</button>
                <button class="digit">5</button>
                <button class="digit">4</button>
                <button class="digit">3</button>
                <button class="digit">2</button>
                <button class="digit">1</button>
                <button class="digit">0</button>
            </div>
            <div class="modifiers subgrid">
                <button class="modifier">AC</button>
            </div>
            <div class="operations subgrid">
                <button class="operation">/</button>
                <button class="operation">X</button>
                <button class="operation">-</button>
                <button class="operation">+</button>
                <button class="operation">=</button>
            </div>
        </div>
    `;
  }

  #mounted() {
    this.#totalElement = this.#element.querySelector('#total');
    this.#element.addEventListener('click', this.#handleElementClick);
  }

  #handleElementClick = (e) => {
    const { target } = e;

    switch (true) {
      case target.classList.contains('digit'):
        this.#handleDigitClick(e);
        break;
      case target.classList.contains('operation'):
        this.#handleOperationClick(e);
        break;
      case target.classList.contains('modifier'):
        this.#handleModifierClick();
        break;
      default:
        break;
    }
  };

  /**
   * @param {MouseEvent} e
   */
  #handleDigitClick = ({ target }) => {
    if (!this.#isCalculateAfter) {
      const digit = target.textContent;
      this.calculatorDigitInput(digit);
    } else if (this.#isCalculateAfter) {
      alert('계산을 한 뒤에는 바로 번호를 입력할 수 없습니다.');
    }
  };

  /**
   * @param {MouseEvent} e
   */
  #handleModifierClick = () => {
    this.#totalElement.textContent = CALCULATOR_INIT_VALUE;
    this.#isCalculateAfter = false;
  };

  /**
   * @param {MouseEvent} e
   */
  #handleOperationClick = ({ target }) => {
    const total = this.#totalElement.textContent;
    const isEqual = target.textContent === CALCULATOR_SYMBOL_EQUAL;
    const operation = target.textContent;
    const isLastStringContainsSymbol = CALCULATOR_SYMBOLS.includes(total.slice(-1));

    if (isEqual && !isLastStringContainsSymbol) {
      this.#totalElement.textContent = calculate(total);
      this.#isCalculateAfter = true;
    } else if (isEqual && isLastStringContainsSymbol) {
      alert('마지막 입력이 기호인채 계산할 수 없습니다.');
    } else if (isEqual === false) {
      this.calculatorOperationInput(operation);
      this.#isCalculateAfter = false;
    }
  };

  /**
   * @param {string} value
   */
  calculatorOperationInput(value) {
    const total = this.#totalElement.textContent;
    const isLastStringContainsSymbol = CALCULATOR_SYMBOLS.includes(total.slice(-1));

    this.#totalElement.textContent = isLastStringContainsSymbol
      ? total.substr(0, total.length - 1) + value
      : total + value;
  }

  calculatorDigitInput(value) {
    const total = this.#totalElement.textContent;
    const regExp = /([0-9]+)/g;
    const totalLastNumbers = total.match(regExp).pop();
    const isLastStringContainsSymbol = CALCULATOR_SYMBOLS.includes(total.slice(-1));

    // TODO: 0을 연속으로 입력했을때 입력되는 이슈 개선하기
    if (totalLastNumbers.length < CALCULATOR_DIGIT_MAX_LENGTH || isLastStringContainsSymbol) {
      this.#totalElement.textContent = total === CALCULATOR_INIT_VALUE ? value : total + value;
    } else {
      alert(`번호를 ${CALCULATOR_DIGIT_MAX_LENGTH}보다 길게 작성할 수 없습니다.`);
    }
  }
}

export default App;

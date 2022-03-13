import { calculatorInitValue, calculatorSymbols, calculatorDigitMaxLength } from './constants.js';
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

  /**
   * @param {string} value
   */
  calculatorInput(value) {
    const total = this.#totalElement.textContent;
    const regExp = /([0-9]+)/g;
    const totalLastNumbers = total.match(regExp).pop();
    const isLastStringContainsSymbol = calculatorSymbols.includes(total.slice(-1));

    // 심볼을 입력한 경우
    if (calculatorSymbols.includes(value)) {
      this.#totalElement.textContent = isLastStringContainsSymbol
        ? total.substr(0, total.length - 1) + value
        : total + value;
      return;
    }

    // 번호를 입력했지만 번호가 최대 자리수를 넘치지 않은 경우
    if (totalLastNumbers.length < calculatorDigitMaxLength || isLastStringContainsSymbol) {
      this.#totalElement.textContent = total === calculatorInitValue ? value : total + value;
      return;
    } else {
      throw new Error(`번호를 ${calculatorDigitMaxLength}보다 길게 작성할 수 없습니다.`);
    }
  }

  /**
   * @param {MouseEvent} e
   */
  #handleDigitsClick = (e) => {
    /**
     * @typedef {object} DestructuredEvent
     * @property {Element} target
     */
    /** @type {DestructuredEvent} */
    const { target } = e;

    if (target.classList.contains('digit') && this.#isCalculateAfter === false) {
      const digit = target.textContent;
      this.calculatorInput(digit);
    } else if (this.#isCalculateAfter) {
      throw new Error('계산를 한 뒤에는 바로 번호를 입력할 수 없습니다.');
    }
  };

  /**
   * @param {MouseEvent} e
   */
  #handleModifiersClick = (e) => {
    /**
     * @typedef {object} DestructuredEvent
     * @property {Element} target
     */
    /** @type {DestructuredEvent} */
    const { target } = e;

    if (target.classList.contains('modifier')) {
      this.#totalElement.textContent = calculatorInitValue;
      this.#isCalculateAfter = false;
    }
  };

  /**
   * @param {MouseEvent} e
   */
  #handleOperationsClick = (e) => {
    /**
     * @typedef {object} DestructuredEvent
     * @property {Element} target
     */
    /** @type {DestructuredEvent} */
    const { target } = e;

    if (target.classList.contains('operation')) {
      const total = this.#totalElement.textContent;
      const isEqual = target.textContent === '=';
      const operation = target.textContent;
      const isLastStringContainsSymbol = calculatorSymbols.includes(total.slice(-1));

      if (isEqual && isLastStringContainsSymbol === false) {
        this.#totalElement.textContent = calculate(total);
        this.#isCalculateAfter = true;
        return;
      } else if (isEqual && isLastStringContainsSymbol) {
        throw new Error('마지막 입력이 기호인채 계산할 수 없습니다.');
      } else if (isEqual === false) {
        this.calculatorInput(operation);
        this.#isCalculateAfter = false;
      }
    }
  };

  #render() {
    this.#element.innerHTML = `
        <div class="calculator">
            <h1 id="total">${calculatorInitValue}</h1>
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
    this.#element.querySelector('.digits').addEventListener('click', this.#handleDigitsClick);
    this.#element.querySelector('.modifiers').addEventListener('click', this.#handleModifiersClick);
    this.#element.querySelector('.operations').addEventListener('click', this.#handleOperationsClick);
  }
}

export default App;

import { Operator } from "./model/Operator.mjs";
import CalculateCore from "./model/Calculate.mjs";
import { InputStore } from "./model/inputStore.mjs";
import { OPERATOR_SYMBOL } from "./constants.mjs";
import { isDigit } from "./util.mjs";

class CalculatorEventListener {
  #calculateCore;

  #container;

  #console;

  #inputStore;

  #operator;

  #events;

  /**
   *
   * @param {HTMLElement} $container
   */
  constructor($container) {
    this.isElementExist($container, "$container");
    const $total = $container.querySelector("#total");
    this.isElementExist($total, "$total");

    this.#container = $container;
    this.#console = $total;
    this.#inputStore = new InputStore();
    this.#operator = new Operator();
    this.#calculateCore = new CalculateCore();
    this.#events = {
      digit: this.digitEventListener,
      operation: this.operationEventListener,
      modifier: this.modifierEventListener,
    };
  }

  isElementExist(element, name) {
    if (!element) {
      throw new Error(`${name} is required`);
    }
  }

  init() {
    this.#container.addEventListener("click", (event) => {
      const {
        target: { className },
      } = event;
      if (this.#events[className]) {
        this.#events[className](event);
      }
    });
  }

  #resetConsole() {
    this.#console.innerText = 0;
  }

  #clearInputStore() {
    this.#inputStore = new InputStore();
  }

  digitEventListener = (event) => {
    const { innerText } = event.target;
    const { innerText: consoleText } = this.#console;
    const lastThreeChar = consoleText.slice(
      consoleText.length - 3,
      consoleText.length
    );
    if (consoleText.length >= 3 && isDigit(lastThreeChar)) {
      alert("숫자는 3자리까지만 입력할 수 있습니다.");
      return;
    }

    this.#console.innerText =
      consoleText === "0" ? innerText : `${consoleText}${innerText}`;
    this.#inputStore.push(innerText);
  };

  operationEventListener = (event) => {
    const { innerText } = event.target;
    if (!this.#inputStore.length) {
      alert("먼저 숫자를 입력해주세요!");
      return;
    }
    if (
      this.#operator.isOperator(this.#inputStore[this.#inputStore.length - 1])
    ) {
      alert("연산자를 연속적으로 입력할 수 없습니다!");
      return;
    }

    if (innerText === OPERATOR_SYMBOL.EQUAL) {
      const total = this.#calculateCore.calculate(this.#inputStore);
      this.#console.innerText = total;
      this.#inputStore = new InputStore([total]);
      return;
    }

    this.#console.innerText += innerText;
    this.#inputStore.push(innerText);
  };

  modifierEventListener = () => {
    this.#clearInputStore();
    this.#resetConsole();
  };
}

export default CalculatorEventListener;

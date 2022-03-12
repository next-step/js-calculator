import { Operator } from "./Operator.js";
import CalculateCore from "./model/Calculate";
import { InputStore } from "./model/inputStore";

class CalculatorEventListener {
  #calculateCore;

  /**
   *
   * @param {HTMLElement} $container
   */
  constructor($container) {
    if (!$container) {
      throw new Error("$container is required");
    }

    const $total = $container.querySelector("#total");

    if (!$total) {
      throw new Error("$total is required");
    }

    this.$container = $container;
    this.$console = $total;
    this.inputStore = new InputStore();
    this.currentNumber = 0;
    this.operator = new Operator();
    this.#calculateCore = new CalculateCore();
  }

  init() {
    this.$container.addEventListener("click", ({ target }) => {
      const { innerText } = target;
      const { innerText: currentConsole } = this.$console;

      if (target.className === "digit") {
        if (this.currentNumber > 99) {
          alert("숫자는 3자리까지만 입력할 수 있습니다.");
          return;
        }

        const parsedValue = parseInt(innerText, 10);
        this.$console.innerText =
          currentConsole === "0" ? innerText : `${currentConsole}${innerText}`;
        this.inputStore.push(innerText);
        this.currentNumber = this.currentNumber * 10 + parsedValue;
        return;
      }
      if (target.className === "operation") {
        if (!this.inputStore.length) {
          alert("먼저 숫자를 입력해주세요!");
          return;
        }
        if (
          this.operator.isOperator(this.inputStore[this.inputStore.length - 1])
        ) {
          alert("연산자를 연속적으로 입력할 수 없습니다!");
          return;
        }

        if (innerText === "=") {
          const total = this.#calculateCore.calculate(this.inputStore);
          this.$console.innerText = total;
          this.inputStore = [total];
          this.currentNumber = total;
          return;
        }

        this.$console.innerText += innerText;
        this.inputStore.push(innerText);
        this.currentNumber = 0;

        return;
      }
      if (target.className === "modifier") {
        this.clearInputStore();
        this.resetConsole();
      }
    });
  }

  resetConsole() {
    this.$console.innerText = 0;
    this.currentNumber = 0;
  }

  clearInputStore() {
    this.inputStore = [];
  }
}

export default CalculatorEventListener;

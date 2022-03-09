import { isOperator } from "./util.js";
import { operatorFunctions } from "./constants.js";

/**
 *
 * @param {Array<number | string>} inputs
 */
const calculate = (inputs) => {
  const { prevSum: total } = inputs.reduce(
    (acc, curr) => {
      const parsedValue = parseInt(curr, 10);

      if (isOperator(curr)) {
        acc.operator = curr;
        return acc;
      }

      if (acc.prevSum === null) {
        acc.prevSum = parsedValue;
        return acc;
      }

      if (acc.operator) {
        acc.prevSum = operatorFunctions[acc.operator](acc.prevSum, parsedValue);
        return acc;
      }

      acc.prevSum = acc.prevSum * 10 + parsedValue;
      return acc;
    },
    { prevSum: null, operator: null }
  );

  return total;
};

class CalculatorEventListener {
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
    this.inputStore = [];
    this.currentNumber = 0;
  }

  init() {
    this.$container.addEventListener("click", ({ target }) => {
      const { innerText } = target;
      if (target.className === "digit") {
        if (this.currentNumber > 99) {
          alert("숫자는 3자리까지만 입력할 수 있습니다.");
          return;
        }
        const { innerText: currentConsole } = this.$console;
        this.$console.innerText =
          currentConsole === "0" ? innerText : `${currentConsole}${innerText}`;
        this.inputStore.push(innerText);
        this.currentNumber = calculate(this.inputStore);
        return;
      }
      if (target.className === "operation") {
        if (!this.inputStore.length) {
          alert("먼저 숫자를 입력해주세요!");
          return;
        }
        if (isOperator(this.inputStore[this.inputStore.length - 1])) {
          alert("연산자를 연속적으로 입력할 수 없습니다!");
          return;
        }

        if (innerText === "=") {
          const total = calculate(this.inputStore);
          this.$console.innerText = total;
          this.inputStore = [total];
          this.currentNumber = total;
          return;
        }

        this.$console.innerText = this.$console.innerText + innerText;
        this.inputStore.push(innerText);
        this.currentNumber = 0;

        return;
      }
      if (target.className === "modifier") {
        this.clearInputStore();
        this.resetConsole();
        this.currentNumber = 0;
      }
    });
  }

  resetConsole() {
    this.$console.innerText = 0;
  }

  clearInputStore() {
    this.inputStore = [];
  }
}

export default CalculatorEventListener;

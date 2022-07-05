import { Model } from "./model.js";
import { Total } from "./components/total.js";
import {
  operatorsIcons,
  MAX_LENGTH_OF_INPUT_NUMBER,
  ERROR_MASAGES,
} from "./constant.js";

class App {
  model;
  total;

  constructor(appElement) {
    const onOverInputNumber = () =>
      window.alert(ERROR_MASAGES.OVER_INPUT_NUMBER);
    const onStepChanged = () => window.alert(ERROR_MASAGES.STEP_CHANGED);

    this.model = new Model({
      maxLengthOfInputNumber: MAX_LENGTH_OF_INPUT_NUMBER,
      onOverInputNumber,
      onStepChanged,
    });

    this.total = new Total(appElement.querySelector("#total"));

    appElement.querySelector(".digits").addEventListener("click", (e) => {
      this.handleNumber(Number(e.target.innerText));
    });

    appElement.querySelector(".modifier").addEventListener("click", (e) => {
      this.allClear();
    });

    appElement.querySelector(".operations").addEventListener("click", (e) => {
      const operator = getOperatorFromIcon(e.target.innerText);

      if (operator) {
        this.handleOperation(operator);
        return;
      }

      this.calculate();
    });
  }

  renderTotal() {
    if (this.model.isInitial()) {
      this.total.setDetaultLabel();
      return;
    }

    const display = this.model.getDisplay();

    this.total.setLabel(display);
  }

  handleNumber(input) {
    this.model.inputNum(input);

    this.renderTotal();
  }

  handleOperation(operation) {
    if (this.model.operation || this.model.num1 === 0) {
      window.alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
      return;
    }

    this.model.operation = operation;

    this.renderTotal();
  }

  calculate() {
    this.model.calculate();

    this.renderTotal();
  }

  allClear() {
    this.model.reset();

    this.renderTotal();
  }
}

new App(document.querySelector("#app"));

function getOperatorFromIcon(icon) {
  const icons = Object.values(operatorsIcons);

  const index = icons.indexOf(icon);

  return Object.keys(operatorsIcons)[index];
}

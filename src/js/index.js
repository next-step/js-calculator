import { Model } from "./model.js";
import { Total } from "./components/total.js";
import { operators } from "./operators.js";
class App {
  model;
  total;

  constructor(appElement) {
    this.model = new Model();
    this.total = new Total(appElement.querySelector("#total"));

    document.querySelector(".digits").addEventListener("click", (e) => {
      this.handleNumberClick(e);
    });
  }

  renderTotal() {
    const { num1, num2, operation } = this.model;

    if (num1 === 0) {
      this.total.setDetaultLabel();
      return;
    }

    const label = getLabel(num1, num2, operation);

    this.total.setLabel(label);
  }

  handleNumberClick(e) {
    const targetKey = this.model.operation ? "num2" : "num1";

    if (this.model[targetKey] >= 100) {
      window.alert("숫자는 세 자리까지만 입력 가능합니다!");
      return;
    }

    this.model.inputNum(targetKey, Number(e.target.innerText));

    this.renderTotal();
  }
}

new App(document.querySelector("#app"));

const getLabel = (num1, num2, operation) => {
  const numLabel1 = num1 || "";
  const numLabel2 = num2 || "";

  const operationLabel =
    operation === undefined ? "" : operators[operation].icon;

  return `${numLabel1}${operationLabel}${numLabel2}`;
};

import { Model } from "./model.js";
import { Total } from "./components/total.js";
import { operators } from "./operators.js";
class App {
  model;
  total;

  constructor(appElement) {
    this.model = new Model();
    this.total = new Total(appElement.querySelector("#total"));
  }

  renderTotal() {
    const { num1, num2, operation } = this.model;

    if (num1 === undefined) {
      this.total.setDetaultLabel();
      return;
    }

    const label = getLabel(num1, num2, operation);

    this.total.setLabel(label);
  }
}

new App(document.querySelector("#app"));

const getLabel = (num1, num2, operation) => {
  const numLabel1 = num1 === undefined ? "" : num1.toString();
  const numLabel2 = num2 === undefined ? "" : num2.toString();

  const operationLabel =
    operation === undefined ? "" : operators[operation].icon;

  return `${numLabel1}${operationLabel}${numLabel2}`;
};

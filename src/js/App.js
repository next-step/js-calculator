import ClearButton from "./components/ClearButton.js";
import ExpressionPad from "./components/ExpressionPad.js";
import NumberPad from "./components/NumberPad.js";
import ResultPanel from "./components/ResultPanel.js";
import DataSet from "./constants/DataSet.js";
import Event from "./constants/Event.js";
import Calculator from "./model/Calculator.js";
import { $ } from "./utils/dom.util.js";

export default class App {
  _ResultPanel;
  _NumberPad;
  _ClearButton;
  _ExpressionPad;

  _calculator;

  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return `
            <div class="calculator">
                <h1 id="total" id="ResultPanel">0</h1>
                <div class="digits flex" id="NumberPad"></div>
                <div class="modifiers subgrid" id="ClearButton"></div>
                <div class="operations subgrid" id="ExpressionPad"></div>
            </div>
        `;
  }

  mounted() {
    if (!this._ResultPanel) {
      this._calculator = new Calculator();
      this._ResultPanel = new ResultPanel($("#total"));
      this._NumberPad = new NumberPad($("#NumberPad"));
      this._ClearButton = new ClearButton($("#ClearButton"));
      this._ExpressionPad = new ExpressionPad($("#ExpressionPad"));
      this.setLazyEvent();
    }
  }

  setLazyEvent() {
    function onClickHandler(event) {
      const clickedElement = event.target;

      if (!this.validateEventElement(clickedElement)) {
        return;
      }

      switch (clickedElement.dataset.type) {
        case DataSet.number:
          this.updateNumber(clickedElement.innerText);
          break;

        case DataSet.expression:
          this.updateExpression(clickedElement.innerText);
          break;

        case DataSet.clear:
          this.clearCalculator();
          break;
      }
    }

    this.$target.addEventListener(Event.onClick, onClickHandler.bind(this));
  }

  updateNumber(number) {
    const isSuccess = this._calculator.setNumber(number);

    if (!isSuccess) {
      alert(this._calculator.error);
      return;
    }

    this.publishResult();
  }

  updateExpression(expression) {
    const isSuccess = this._calculator.setExpression(expression);

    if (!isSuccess) {
      alert(this._calculator.error);
    }

    this.publishResult();
  }

  clearCalculator() {
    this._calculator.clear();
    this.publishResult();
  }

  publishResult() {
    this._ResultPanel.setState({ result: this._calculator.result });
  }

  validateEventElement(clickedElement) {
    if (!clickedElement) {
      return false;
    }

    return !!clickedElement.dataset.type;
  }
}

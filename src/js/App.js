import ClearButton from "./components/ClearButton.js";
import ExpressionPad from "./components/ExpressionPad.js";
import NumberPad from "./components/NumberPad.js";
import ResultPanel from "./components/ResultPanel.js";
import DataSet from "./constants/DataSet.js";
import Event from "./constants/Event.js";
import Message from "./constants/Message.js";
import Component from "./core/Component.js";
import Calculator from "./model/Calculator.js";
import { $ } from "./utils/dom.util.js";

export default class App extends Component {
  _ResultPanel;
  _NumberPad;
  _ClearButton;
  _ExpressionPad;

  _calculator;

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

      this.setLazyEvent().bind(this);
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
      alert(Message.numberValidationError);
      return;
    }

    this._ResultPanel.setState({ result: this._calculator.result });
  }

  updateExpression(expression) {
    const isSuccess = this._calculator.setExpression(expression);

    if (!isSuccess) {
      alert(Message.expressionValidationError);
    }

    this._ResultPanel.setState({ result: this._calculator.result });
  }

  clearCalculator() {
    console.log("clear!");
  }

  validateEventElement(clickedElement) {
    if (!clickedElement) {
      return false;
    }

    return !!clickedElement.dataset.type;
  }
}

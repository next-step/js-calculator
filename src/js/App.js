import ClearButton from "./components/ClearButton.js";
import ExpressionPad from "./components/ExpressionPad.js";
import NumberPad from "./components/NumberPad.js";
import ResultPanel from "./components/ResultPanel.js";
import Event from "./constants/Event.js";
import Component from "./core/Component.js";
import { $ } from "./utils/dom.util.js";

export default class App extends Component {
  _ResultPanel;
  _NumberPad;
  _ClearButton;
  _ExpressionPad;

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
    this.injection();
  }

  injection() {
    if (!this._ResultPanel) {
      this._ResultPanel = new ResultPanel($("#total"));
      this._NumberPad = new NumberPad($("#NumberPad"));
      this._ClearButton = new ClearButton($("#ClearButton"));
      this._ExpressionPad = new ExpressionPad($("#ExpressionPad"));
    }
  }

  setEvent() {
    this.$target.addEventListener(Event.onClick, (event) => {
      const clickedElement = event.target;

      const isValid = this.validateEventElement(clickedElement);

      console.log(isValid);
    });
  }

  validateEventElement(clickedElement) {
    if (!clickedElement) {
      return false;
    }

    return !!clickedElement.dataset.type;
  }
}

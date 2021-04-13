import { NUM, OPERATOR, MESSAGES, PANEL_TYPE } from "./constant.js";
import { getEl } from "./util.js";

class Calculator {
  constructor() {
    this.prevNum = NUM.DEFAULT;
    this.currNum = NUM.DEFAULT;
    this.operator = OPERATOR.DEFAULT;
    this.totalEl = getEl("#total");
    this.init();
  }

  init() {
    getEl(".calculator").addEventListener('click', this.clickDelegationHandler.bind(this));
  }

  clickDelegationHandler({ target }) {
    const panel = target.closest('.panel');
    if (!panel) return;
    if (panel.classList.contains(PANEL_TYPE.DIGITS)) return this._digitsHandler(target);
    if (panel.classList.contains(PANEL_TYPE.MODIFIERS)) return this._modifierHandler();
    if (panel.classList.contains(PANEL_TYPE.OPERATIONS)) return this._operationsHandler(target);
  }

  _digitsHandler(target) {
    const num = this.currNum + target.innerText;
    if (+num > NUM.MAX || +num < NUM.MIN) return alert(MESSAGES.INVALID_LENGTH);
    if (+num === NUM.DEFAULT && this.operator === OPERATOR.DIV) return alert(MESSAGES.INVALID_NUMBER);
    this.currNum = +num;
    this._updateView();
  }

  _modifierHandler() {
    this.prevNum = NUM.DEFAULT;
    this.currNum = NUM.DEFAULT;
    this.operator = OPERATOR.DEFAULT;
    this._updateView();
  }

  _operationsHandler(target) {
    const operator = target.innerText;
    if (operator === OPERATOR.EQUAL) return this._calculate();
    if (operator !== OPERATOR.EQUAL && this.currNum === "") return alert(MESSAGES.INVALID_OPERATOR);
    if (operator !== OPERATOR.EQUAL && this.currNum !== "" && this.prevNum !== "") return this._calculate(operator);

    this.prevNum = this.currNum;
    this.currNum = "";
    this.operator = operator;
    this._updateView();
  }

  _calculate(nextOperator) {
    const a = this.prevNum;
    const b = this.currNum;

    switch (this.operator) {
      case OPERATOR.ADD: this.currNum = a + b;
        break;
      case OPERATOR.SUB: this.currNum = a - b;
        break;
      case OPERATOR.MUL: this.currNum = a * b;
        break;
      case OPERATOR.DIV: this.currNum = Math.floor(a / b);
        break;
      default: break;
    }

    this.prevNum = nextOperator ? this.currNum : "";
    this.currNum = nextOperator ? "" : this.currNum;
    this.operator = nextOperator ? nextOperator : "";
    this._updateView();
  }

  _updateView() {
    this.totalEl.innerText = `
        ${this.prevNum ? this.prevNum : this.operator ? this.prevNum : ""}\
        ${this.operator ? this.operator : ""}\
        ${this.currNum}
        `.trim();
  }
}

export default Calculator;

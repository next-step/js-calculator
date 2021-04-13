import { NUM, OPERATOR, MESSAGES } from "./constant.js";
import { getEl } from "./util.js";

class Calculator {
  constructor() {
    this.prevNum = NUM.DEFAULT;
    this.currNum = NUM.DEFAULT;
    this.operator = OPERATOR.DEFAULT;
    this.totalEl = getEl("#total");
    this.digitsEl = getEl(".digits");
    this.modifierEl = getEl(".modifier");
    this.operationsEl = getEl(".operations");
    this.init();
  }

  init() {
    this.digitsEl.addEventListener("click", this.digitsHandler.bind(this));
    this.modifierEl.addEventListener("click", this.modifierHandler.bind(this));
    this.operationsEl.addEventListener(
      "click",
      this.operationsHandler.bind(this)
    );
  }

  digitsHandler({ target }) {
    const num = this.currNum + target.innerText;
    if (+num > NUM.MAX || +num < NUM.MIN) return alert(MESSAGES.INVALID_LENGTH);
    this.currNum = +num;
    this._updateView();
  }

  modifierHandler() {
    this.prevNum = NUM.DEFAULT;
    this.currNum = NUM.DEFAULT;
    this.operator = OPERATOR.DEFAULT;
    this._updateView();
  }

  operationsHandler({ target }) {
    const operator = target.innerText;
    if (operator === OPERATOR.EQUAL) return this._calculate();
    if (operator !== OPERATOR.EQUAL && this.currNum === "")
      return alert(MESSAGES.INVALID_OPERATOR);
    if (
      operator !== OPERATOR.EQUAL &&
      this.currNum !== "" &&
      this.prevNum !== ""
    )
      return this._calculate(operator);

    this.prevNum = this.currNum;
    this.currNum = "";
    this.operator = operator;
    this._updateView();
  }

  _calculate(nextOperator) {
    const a = this.prevNum;
    const b = this.currNum;

    switch (this.operator) {
      case OPERATOR.ADD:
        this.currNum = a + b;
        break;
      case OPERATOR.SUB:
        this.currNum = a - b;
        break;
      case OPERATOR.MUL:
        this.currNum = a * b;
        break;
      case OPERATOR.DIV:
        this.currNum = Math.floor(a / b);
        break;
      default:
        break;
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

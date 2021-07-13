import { BUTTON_TYPE, ERROR_MESSAGES, OPERATOR, VALUE } from "./constants.js";

const $ = (target) => {
  return document.querySelector(target);
};

class Calculator {
  constructor() {
    this.curNumber = "";
    this.prevNumber = "";
    this.operator = "";
    this.init();
  }

  init() {
    this.registerButtonClickHandler();
  }

  registerButtonClickHandler = () => {
    const buttons = document.querySelectorAll("button");
    const { DIGIT, OPERATION, MODIFIER } = BUTTON_TYPE;

    buttons.forEach((button) => {
      if (button.classList.contains(DIGIT)) {
        button.addEventListener("click", () => this._onClickDigit(button));
      }
      if (button.classList.contains(OPERATION)) {
        button.addEventListener("click", () => this._onClickOperator(button));
      }
      if (button.classList.contains(MODIFIER)) {
        button.addEventListener("click", this._onClickModifier);
      }
    });
  };

  _render() {
    if (this.prevNumber) {
      $("#total").innerHTML = `${this.prevNumber}${this.operator}${this.curNumber}`;
      return;
    }
    if (this.curNumber) {
      $("#total").innerHTML = `${this.curNumber}${this.operator}`;
      return;
    }
    $("#total").innerHTML = VALUE.DEFAULT_VALUE;
  }

  _onClickDigit = (target) => {
    if (this.curNumber.length >= VALUE.DIGIT_LIMIT_LENGTH) {
      return alert(ERROR_MESSAGES.DIGIT_LIMIT);
    }
    this.curNumber += target.innerHTML;
    this._render();
  };

  _onClickOperator = (target) => {
    if (target.innerHTML === OPERATOR.EQUAL) {
      const total = this._calculate(this.operator);
      this.curNumber = parseInt(total);
      this.prevNumber = "";
      this.operator = "";
      this._render();
      return;
    }
    this.prevNumber = this.curNumber;
    this.curNumber = "";
    this.operator = target.innerHTML;
    this._render();
  };

  _onClickModifier = () => {
    this.curNumber = "";
    this.operator = "";
    this.prevNumber = "";
    this._render();
  };

  _calculate = (operator) => {
    const curNumber = this.curNumber ? parseInt(this.curNumber) : VALUE.DEFAULT_VALUE;
    const prevNumber = parseInt(this.prevNumber);

    const { SUM, SUB, MULTI, DIV } = OPERATOR;

    const calculate = {
      [SUM]: () => {
        return prevNumber + curNumber;
      },
      [SUB]: () => {
        return prevNumber - curNumber;
      },
      [MULTI]: () => {
        return prevNumber * curNumber;
      },
      [DIV]: () => {
        return prevNumber / curNumber;
      },
    };

    return calculate[operator]();
  };
}

export default Calculator;

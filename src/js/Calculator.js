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

    buttons.forEach((button) => {
      if (button.classList.contains("digit")) {
        button.addEventListener("click", () => this._onClickDigit(button));
      }
      if (button.classList.contains("operation")) {
        button.addEventListener("click", () => this._onClickOperator(button));
      }
      if (button.classList.contains("modifier")) {
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
    $("#total").innerHTML = "0";
  }

  _onClickDigit = (target) => {
    if (this.curNumber.length >= 3) {
      return alert("숫자는 최대 3자리 수까지 입력 가능합니다.");
    }
    this.curNumber += target.innerHTML;
    this._render();
  };

  _onClickOperator = (target) => {
    if (target.innerHTML === "=") {
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
    const curNumber = this.curNumber ? parseInt(this.curNumber) : 0;
    const prevNumber = parseInt(this.prevNumber);

    const calculate = {
      "+": () => {
        return prevNumber + curNumber;
      },
      "-": () => {
        return prevNumber - curNumber;
      },
      X: () => {
        return prevNumber * curNumber;
      },
      "/": () => {
        return prevNumber / curNumber;
      },
    };

    return calculate[operator]();
  };
}

export default Calculator;

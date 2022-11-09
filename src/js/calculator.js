import { MAX_LENGTH } from "./const.js";

class Calculator {
  result = 0;
  current = 0;
  operator = "";

  add() {
    this.result += Number(this.current);
  }

  substract() {
    this.result -= Number(this.current);
  }

  multiply() {
    this.result *= Number(this.current);
  }

  divide() {
    this.result = Math.floor(this.result / Number(this.current));
  }

  allClear() {
    this.current = 0;
    this.result = 0;
    this.operator = "";
  }

  pressDigit(digit) {
    if (String(this.current).length === MAX_LENGTH) {
      alert(`${MAX_LENGTH}자리 이하의 수만 입력 가능합니다.`);
      return;
    }
    this.current = Number(`${this.current}${digit}`);
  }

  pressOperator(currentOperator) {
    if (currentOperator === "=") {
      switch (this.operator) {
        case "+":
          this.add();
          break;
        case "-":
          this.substract();
          break;
        case "X":
          this.multiply();
          break;
        case "/":
          this.divide();
          break;
      }
    } else {
      this.result = Number(this.current);
    }

    this.operator = currentOperator;
    this.current = 0;
  }
}

export const calculator = new Calculator();

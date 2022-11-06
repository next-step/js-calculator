class Calculator {
  nums = [];
  operator = null;
  initTotal = false;

  sum(num1, num2) {
    return num1 + num2;
  }

  subtract(num1, num2) {
    return num1 - num2;
  }

  divide(num1, num2) {
    return parseInt(num1 / num2);
  }

  multiply(num1, num2) {
    return num1 * num2;
  }

  calculate() {
    let result = 0;
    const num1 = this.nums[0];
    const num2 = this.nums[1];

    if (this.operator === "+") {
      result = this.sum(num1, num2);
    } else if (this.operator === "-") {
      result = this.subtract(num1, num2);
    } else if (this.operator === "X") {
      result = this.multiply(num1, num2);
    } else if (this.operator === "/") {
      result = this.divide(num1, num2);
    }

    const total = document.querySelector("#total");
    total.textContent = result;

    this.operator = null;
    this.nums = [result];
  }

  initialize() {
    const total = document.querySelector("#total");
    total.textContent = 0;
  }

  acAddEventListener() {
    const acBtn = document.querySelector(".modifier");
    acBtn.addEventListener("click", (event) => {
      this.initialize();
    });
  }

  digitAddEventListener() {
    const digits = document.querySelector(".digits");
    const total = document.querySelector("#total");

    digits.addEventListener("click", (event) => {
      const digit = event.target.innerText;
      const totalValue = total.textContent;

      if (totalValue.length === 3 || totalValue === "0" || this.initTotal) {
        total.innerText = digit;
        if (this.initTotal) this.initTotal = !this.initTotal;
      } else {
        total.innerText = totalValue + digit;
      }

      if (!this.operator) {
        this.nums = [Number(total.textContent)];
      } else {
        this.nums.push(Number(total.textContent));
      }
    });
  }

  operationAddEventListener() {
    const operations = document.querySelector(".operations");

    operations.addEventListener("click", (event) => {
      const operator = event.target.textContent;
      if (this.operator !== null && operator !== "=") {
        alert("이미 두 개의 숫자를 클릭했습니다.");
        return;
      }
      if (operator === "+") {
        this.operator = "+";
      } else if (operator === "-") {
        this.operator = "-";
      } else if (operator === "X") {
        this.operator = "X";
      } else if (operator === "/") {
        this.operator = "/";
      } else if (operator === "=") {
        this.calculate();
      }

      this.initTotal = true;
    });
  }
}

console.log("Calculator..");
const calculator = new Calculator();
calculator.acAddEventListener();
calculator.digitAddEventListener();
calculator.operationAddEventListener();

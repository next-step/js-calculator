class Calculator {
  nums = [];
  operator = null;
  initTotal = false;

  sum(num1, num2) {
    return num1 + num2;
  }

  subtract(num1, num2) {}

  divide(num1, num2) {}

  multiply(num1, num2) {}

  calculate() {
    let result = 0;
    if (this.operator === "+") {
      result = this.sum(this.nums[0], this.nums[1]);
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

      if (operator === "+") {
        this.operator = "+";
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

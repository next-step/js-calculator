const NUMLENGTH = 3;
const INITTOTAL = "0";
const operations = {
  "+": this.sum,
  "-": this.subtract,
  X: this.multiply,
  "/": this.divide,
};

class Calculator {
  constructor(total) {
    this.total = total;
  }

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
    return Math.floor(num1 / num2);
  }

  multiply(num1, num2) {
    return num1 * num2;
  }

  calculate() {
    if (this.operator === null) return;
    const num1 = this.nums[0];
    const num2 = this.nums[1];

    const operatorMapper = () => operations[this.operator] || null;
    const result = operatorMapper()(num1, num2);

    this.total.textContent = result;

    this.operator = null;
    this.nums = [result];
  }

  allClear() {
    this.total.textContent = 0;
    this.operator = null;
  }

  clickDigit(event) {
    const digit = event.target.innerText;
    const totalValue = total.textContent;

    if (
      totalValue.length === NUMLENGTH ||
      totalValue === INITTOTAL ||
      this.initTotal
    ) {
      this.total.innerText = digit;
    } else {
      this.total.innerText = totalValue + digit;
    }

    if (this.initTotal) this.initTotal = !this.initTotal;

    if (!this.operator) {
      this.nums = [Number(total.textContent)];
    } else {
      this.nums[1] = Number(total.textContent);
    }
  }

  clickOperations(event) {
    const operator = event.target.textContent;
    if (this.operator !== null && operator !== "=") {
      alert("이미 두 개의 숫자를 클릭했습니다.");
      return;
    }
    if (this.oeprator === null && operator === "=") {
      alert("먼저 숫자를 클릭하세요.");
      return;
    }

    if (operator === "=") {
      this.calculate();
    } else {
      this.operator = operator;
    }

    this.initTotal = true;
  }

  acAddEventListener() {
    const acBtn = document.querySelector(".modifier");
    acBtn.addEventListener("click", (event) => {
      this.allClear();
    });
  }

  digitAddEventListener() {
    const digits = document.querySelector(".digits");
    digits.addEventListener("click", (event) => {
      this.clickDigit(event);
    });
  }

  operationAddEventListener() {
    const operations = document.querySelector(".operations");
    operations.addEventListener("click", (event) => {
      this.clickOperations(event);
    });
  }
}

export default Calculator;

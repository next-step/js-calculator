class Calculator {
  constructor() {
    this.setDOM();
    this.setEvent();
    this.result = 0;
  }
  setDOM() {
    this.$total = document.getElementById("total");
    this.$digits = document.querySelector(".digits");
    this.$modifiers = document.querySelector(".modifiers");
    this.$operations = document.querySelector(".operations");
    this.$equal = document.getElementById("equal-sign");
    this.$modifier = document.querySelector(".modifier");
  }
  setEvent() {
    this.$digits.addEventListener("click", (e) => {
      this.clickDigits(e);
    });
    this.$operations.addEventListener("click", (e) => {
      this.clickOperation(e);
    });
    this.$modifier.addEventListener("click", (e) => {
      this.clickModifier(e);
    });
    this.$equal.addEventListener("click", (e) => {
      this.clickEqual(e);
    });
  }
  clickEqual(e) {
    if (this.$total.innerText !== "0") {
      if (this.$total.innerText.includes("+")) {
        const [num1, num2] = this.result.split("+");
        this.result = this.sum(+num1, +num2);
      }
      if (this.$total.innerText.includes("-")) {
        const [num1, num2] = this.result.split("-");
        this.result = this.minus(+num1, +num2);
      }
      if (this.$total.innerText.includes("X")) {
        const [num1, num2] = this.result.split("X");
        this.result = this.multiplication(+num1, +num2);
      }
      if (this.$total.innerText.includes("/")) {
        const [num1, num2] = this.result.split("/");
        this.result = this.division(+num1, +num2);
      }
      this.$total.innerText = this.result;
    }
  }
  sum(num1, num2) {
    return num1 + num2;
  }
  minus(num1, num2) {
    return num1 - num2;
  }
  multiplication(num1, num2) {
    return num1 * num2;
  }
  division(num1, num2) {
    return Math.floor(num1 / num2);
  }
  clickModifier(e) {
    this.$total.innerText = "0";
  }
  clickDigits(e) {
    const digit = e.target.closest(".digit").innerText;
    if (this.$total.innerText[0] === "0") {
      this.$total.innerText = "";
    }
    this.$total.innerText += digit;
    if (this.$total.innerText.length > 3) {
      alert("nope");
      this.result = this.$total.innerText.slice(0, this.$total.innerText.length - 1);
      this.$total.innerText = this.result;
    }
    this.result = this.$total.innerText;
  }
  clickOperation(e) {
    const operation = e.target.closest(".operation").innerText;
    if (operation !== "=") {
      if (this.$total.innerText !== "0") {
        if (operation === "+") {
          this.$total.innerText += "+";
          this.result = "";
          return;
        }
        if (operation === "-") {
          this.$total.innerText += "-";
          return;
        }
        if (operation === "X") {
          this.$total.innerText += "X";
          return;
        }
        if (operation === "/") {
          this.$total.innerText += "/";
          return;
        }
      } else {
        this.$total.innerText = 0;
      }
    }
  }
}

const calculator = new Calculator();

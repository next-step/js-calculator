class Calculator {
  constructor() {
    this.setDOM();
    this.setEvent();
  }

  setDOM() {
    this.$total = document.getElementById("total");
    this.$digits = document.querySelector(".digits");
    this.$modifiers = document.querySelector(".modifiers");
    this.$operations = document.querySelector(".operations");
    this.$equal = document.getElementById("equalOperation");
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
  }

  clickOperation(e) {
    const operation = e.target.closest(".operation").innerText;
    this.$total.innerText += operation;
  }
}

const calculator = new Calculator();

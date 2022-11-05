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
  }

  setEvent() {
    this.$digits.addEventListener("click", (e) => {
      this.clickDigits(e);
    });
  }

  clickDigits(e) {
    const digit = e.target.closest(".digit").innerText;
    this.$total.innerText += digit;
  }
}

const calculator = new Calculator();

import { $, calculate } from "./utils.js";
import { OPERATOR } from "./constants.js";
import { isOverMaxNumber } from "./validation.js";

export function calculator() {
  this.num1 = "";
  this.num2 = "";
  this.operator = null;

  this.$total = $("#total");
  this.$modifier = $(".modifiers");
  this.$digits = $(".digits");
  this.$operations = $(".operations");

  this.init = () => {
    this.setEvents();
  };

  this.setEvents = () => {
    console.log(this);
    this.$digits.addEventListener("click", (e) => clickDigits(e));
    this.$operations.addEventListener("click", (e) => clickOperators(e));
    this.$modifier.addEventListener("click", clickModifier);
  };

  const clickDigits = (e) => {
    const digit = e.target.textContent;

    if (!this.num1) firstClickDigit();
    if (this.operator) {
      if (!isOverMaxNumber(this.num2)) {
        this.num2 += digit;
        showTotal(digit);
      }
    } else {
      if (!isOverMaxNumber(this.num1)) {
        this.num1 += digit;
        showTotal(digit);
      }
    }
  };

  const clickOperators = (e) => {
    const operator = e.target.textContent;

    if (OPERATOR.EQUAL === operator) {
      const result = calculate(this.num1, this.num2, this.operator);
      showResult(result);
      resetData();
    } else {
      this.$total.textContent += operator;
      this.operator = operator;
    }
  };

  const clickModifier = () => {
    resetData();
    resetTotal();
  };
  const resetData = () => {
    this.num1 = "";
    this.num2 = "";
    this.operator = null;
  };

  const showTotal = (value) => {
    this.$total.textContent += String(value);
  };

  const showResult = (value) => {
    this.$total.textContent = String(value);
  };

  const resetTotal = () => {
    this.$total.textContent = "0";
  };

  const firstClickDigit = () => {
    this.$total.textContent = "";
  };

  const creatOperand = (target, digit) => {
    if (!isOverMaxNumber(target)) {
      target += digit;
    }
  };
  this.init();
}

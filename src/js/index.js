import { isButtonElement } from "./utils/validators.js";

let firstTerm = "";
let secondTerm = "";
let operator = "";
let total = 0;

const totalEl = document.querySelector("#total");
const operations = document.querySelector(".operations");
operations.addEventListener("click", (e) => {
  if (isButtonElement(e.target)) {
    const _operator = e.target.innerHTML;
    if (_operator === "=") {
      console.log(`${firstTerm} ${operator} ${secondTerm}`);
    } else {
      operator = _operator;
      console.log(operator);
    }
  }
});

const digits = document.querySelector(".digits");
digits.addEventListener("click", (e) => {
  if (isButtonElement(e.target)) {
    const digit = e.target.innerText;
    if (Boolean(operator)) {
      if (secondTerm.length === 3) {
        alert("");
      } else {
        secondTerm += digit;
        console.log("secondTerm", secondTerm);
        totalEl.innerHTML = secondTerm;
      }
    } else {
      if (typeof firstTerm === "string" && firstTerm.length === 3) {
        alert("");
      } else {
        firstTerm += digit;
        console.log("firstTerm", firstTerm);
        totalEl.innerHTML = firstTerm;
      }
    }
  }
});

const modifiers = document.querySelector(".modifiers");
modifiers.addEventListener("click", (e) => {
  const target = e.target;
  if (isButtonElement(target)) {
    if (target.innerText === "AC") {
      firstTerm = "";
      secondTerm = "";
      operator = "";
      totalEl.innerText = "0";
    }
  }
});

import operates from "./operates.js";
import { validateNumber } from "./utils.js";

let firstNumber = "";
let secondNumber = "";
let operator = "";

(() => {
  const total = document.getElementById("total");
  const clear = document.getElementById("clear");
  const digits = document.querySelectorAll(".digit");
  const operators = document.querySelectorAll(".operation");

  digits.forEach((element) => {
    element.addEventListener("click", (e) => {
      const digit = e.target.innerText;

      if (operator) {
        total.innerText = secondNumber = validateNumber(secondNumber, digit);
      } else {
        total.innerText = firstNumber = validateNumber(firstNumber, digit);
      }
    });
  });

  operators.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (secondNumber && e.target.innerText === "=") {
        total.innerText = operates[operator](firstNumber, secondNumber);
        return;
      }

      operator = e.target.innerText;
    });
  });

  clear.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    total.innerText = "0";
    operator = "";
  });
})();

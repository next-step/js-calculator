import Ui from "./ui.js";
import { OPERATION } from "./constants.js";

window.onload = () => {
  const digits = document.querySelectorAll(".digit");
  const operators = document.querySelectorAll(".operation");
  const modifier = document.querySelector(".modifier");
  const total = document.querySelector("#total");

  const ui = new Ui(total);

  digits.forEach((digit) => {
    digit.addEventListener("click", () => {
      ui.onClickDigit(digit.innerText);
    });
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      const operation = operator
        .getAttribute("data-cy")
        .replace("operator-", "");
      ui.onClickOperator(OPERATION[operation]);
    });
  });

  modifier.addEventListener("click", () => {
    ui.initialize();
  });
};

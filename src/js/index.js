const plus = (first, second) => first + second;

const minus = (first, second) => first - second;

const multiply = (first, second) => first * second;

const divide = (first, second) => Math.floor(first / second);

const calculator = {
  plus,
  minus,
  multiply,
  divide,
};

let num1 = "";
let num2 = "";
let operator = "";

const setNumber = (value, digit) => {
  if (value.length === 0 && digit === "0") {
    return "0";
  }

  // 세 자리 이상일 떄
  if (value.length > 2) {
    return value;
  }

  return value + digit;
};

window.addEventListener("DOMContentLoaded", (_) => {
  const total = document.getElementById("total");
  const clear = document.getElementById("clear");
  const digits = document.querySelectorAll(".digit");
  const operators = document.querySelectorAll(".operation");

  digits.forEach((element) => {
    element.addEventListener("click", (e) => {
      const digit = e.target.innerText;

      if (operator) {
        num2 = setNumber(num2, digit);
        total.innerText = num2;
      } else {
        num1 = setNumber(num1, digit);
        total.innerText = num1;
      }
    });
  });

  operators.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.innerText === "=") {
        switch (operator) {
          case "+":
            total.innerText = calculator.plus(Number(num1), Number(num2));
            break;
          case "-":
            total.innerText = calculator.minus(Number(num1), Number(num2));
            break;
          case "X":
            total.innerText = calculator.multiply(Number(num1), Number(num2));
            break;
          case "/":
            total.innerText = calculator.divide(Number(num1), Number(num2));
            break;
        }
        return;
      }

      operator = e.target.innerText;
    });
  });

  clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    total.innerText = "0";
    operator = "";
  });
});

let firstNumberString = "";
let secondNumberString = "";
let operator = "";
let displayText = "";
let hasClickedOperator = false;

const updateDisplayText = (text) => {
  const total = document.querySelector("#total");
  total.innerText = text;
};

const initializeInputData = () => {
  firstNumberString = "";
  secondNumberString = "";
  operator = "";
  hasClickedOperator = false;
};

window.onload = function () {
  const digits = document.getElementsByClassName("digit");
  for (const digit of digits) {
    digit.addEventListener("click", () => {
      if (hasClickedOperator) {
        secondNumberString += digit.textContent;
        displayText = firstNumberString + operator + secondNumberString;
      } else {
        firstNumberString += digit.textContent;
        displayText = firstNumberString;
      }
      updateDisplayText(displayText);
    });
  }

  const operations = document.getElementsByClassName("operation");
  for (const operation of operations) {
    operation.addEventListener("click", () => {
      hasClickedOperator = true;
      operator = operation.textContent;
      displayText += operation.textContent;
      updateDisplayText(displayText);
    });
  }

  const equal = document.getElementById("equal");
  equal.addEventListener("click", () => {
    // 연산
    const firstNumber = Number(firstNumberString);
    const secondNumber = Number(secondNumberString);
    let result = 0;
    switch (operator) {
      case "/":
        result = firstNumber / secondNumber;
        break;
      case "X":
        result = firstNumber * secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "+":
        result = firstNumber + secondNumber;
        break;
    }
    displayText = result;
    updateDisplayText(displayText);
    initializeInputData();
  });

  const modifier = document.getElementsByClassName("modifier")[0];
  modifier.addEventListener("click", () => {
    displayText = "0";
    initializeInputData();
    updateDisplayText(displayText);
  });
};

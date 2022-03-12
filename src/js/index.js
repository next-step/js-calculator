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

const isLessThanThreeDigits = (numberString) => {
  if (numberString.length < 3) {
    return true;
  }
  return false;
};

window.onload = function () {
  const digits = document.getElementsByClassName("digit");
  for (const digit of digits) {
    digit.addEventListener("click", () => {
      if (hasClickedOperator) {
        if (isLessThanThreeDigits(secondNumberString)) {
          secondNumberString += digit.textContent;
          displayText = firstNumberString + operator + secondNumberString;
        } else {
          window.alert("한번에 최대 3자리 수까지 입력할 수 있어요. ");
        }
      } else {
        if (isLessThanThreeDigits(firstNumberString)) {
          firstNumberString += digit.textContent;
          displayText = firstNumberString;
        } else {
          window.alert("한번에 최대 3자리 수까지 입력할 수 있어요. ");
        }
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

const calculator = document.querySelectorAll(".calculator");
const total = document.getElementById("total");

// Properties
let calculatingValue = {
    currentValue: 0,
    previousValue: 0,
    operator: ""
  };

// Initial Setting
calculator.forEach((button) => {
    button.addEventListener("click", handleClickBtn);
});

// Functions
function handleClickBtn(event) {
    const value = event.target.innerText;

    if (/[0-9]/.test(value)) {
      return setNumber(value);
    }
  
    if (value === "AC") {
      return reset();
    }
  
    if (value === "=") {
      return complete();
    }
  
    return setOperation(value);
  }

  function setNumber(value) {
    let inputNumber = String(total.innerText) + value;      
    renderNumber(String(Number(inputNumber)));
  }

  function renderNumber(number) {
    const checkFigures = lessThanFourFigures(number);
    total.innerText = (checkFigures ? number : total.innerText);
    if (calculatingValue.operator) {
        calculatingValue.currentValue = total.innerText;
    } else {
        calculatingValue.previousValue = total.innerText;
    }
  }  

  function lessThanFourFigures(number) {
    if (number.length > 3) {
        alert("숫자는 3자리까지 입력 가능합니다 👻")
        return false
    } else {
        return true
    }
  }

  function reset() {
    calculatingValue = {};
    total.innerText = 0;
  }

  function complete() {
    const calculated = calculate();
    total.innerText = calculated;
  }

  function calculate() {
    const a = Number(calculatingValue.previousValue)
    const b = Number(calculatingValue.currentValue)
    switch (calculatingValue.operator) {
        case "/": {
            return (a / b);
            break;
        }
        case "X": {
            return (a * b);
            break;
        }
        case "-": {
            return (a - b);
            break;
        }
        case "+": {
            return (a + b);
            break;
        }
    }
  }

  function setOperation(value) {
    if (calculatingValue.operator && calculatingValue.currentValue) {
        alert("두 숫자까지만 계산이 가능합니다 🎃");
    }

    if (calculatingValue.previousValue && !calculatingValue.currentValue) {
        total.innerText = 0
        calculatingValue.operator = value;
    } 
  }

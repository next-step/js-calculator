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
    }
  
    return setOperation(value);
  }

  function setNumber(value) {
    let inputNumber = String(total.innerText) + value;      
  }
  function reset() {
    calculatingValue = {};
    total.innerText = 0;
  }

  function setOperation(value) {
  }

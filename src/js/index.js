const calculator = document.querySelectorAll(".calculator");
const total = document.getElementById("total");

// Initial Setting
calculator.forEach((button) => {
    button.addEventListener("click", handleClickBtn);
});

// Functions
function handleClickBtn(event) {
    const value = event.target.innerText;

    if (/[0-9]/.test(value)) {
    }
  
    if (value === "AC") {
    }
  
    if (value === "=") {
    }
  
    return setOperation(value);
  }
  function setOperation(value) {
  }

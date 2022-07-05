import { $ } from "./utils/dom.js";

let numberCount = 0;
let firstNumber = 0;
let lastNumber = 0;
let operator = "";

function App() {
  this.init = () => {
    initEventListeners();
  };
}

const updateDisplay = (e) => {
  if ($("#total").innerText === "0") {
    $("#total").innerText = e.target.innerText;
  } else {
    $("#total").innerText += e.target.innerText;
  }
};

const resetDisplay = (resetNumber, numCount) => {
  $("#total").innerText = resetNumber;
  numberCount = numCount;
  firstNumber = 0;
  lastNumber = 0;
  operator = "";
};

const clickOperationBtn = () => {
  if (operator === "") {
    return;
  }

  const displayArray = $("#total").innerText.split(operator);
  if (!isNaN(displayArray[1])) {
    lastNumber = Number(displayArray[1]);
  }

  const result = calculate();
  resetDisplay(result, 1);
};

const calculate = () => {
  switch (operator) {
    case "/": {
      return Math.floor(firstNumber / lastNumber);
    }
    case "X": {
      return firstNumber * lastNumber;
    }
    case "-": {
      return firstNumber - lastNumber;
    }
    case "+": {
      return firstNumber + lastNumber;
    }
  }
};

const initEventListeners = () => {
  $(".operations").addEventListener("click", (e) => {
    if (e.target.innerText === "=") {
      clickOperationBtn();
    } else {
      const lastOperation = $("#total").innerText.slice(-1);
      if (
        $("#total").innerText === "0" ||
        ["/", "X", "-", "+"].includes(lastOperation)
      ) {
        alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
        return;
      }
      firstNumber = Number($("#total").innerText);
      operator = e.target.innerText;
      $("#total").innerText += e.target.innerText;
      numberCount = 0;
    }
  });

  $(".digits").addEventListener("click", (e) => {
    if (e.target.classList.contains("digit")) {
      if (numberCount >= 3) {
        alert("숫자는 세 자리까지만 입력 가능합니다!");
        return;
      }
      updateDisplay(e);
      numberCount++;
    }
  });

  $(".modifiers").addEventListener("click", (e) => {
    resetDisplay("0", 0);
  });
};

const app = new App();
app.init();

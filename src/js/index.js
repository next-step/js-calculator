/*
## 🎯 기능 요구사항

- [o]계산기에서 작업을 수행함에따라 계산기 화면이 업데이트된다.
  - [o] 화면에 표시된 숫자가 0일 경우
    - [o] 숫자를 클릭하면 값이 바뀐다.
    - [o] 연산자를 누르면 '숫자를 먼저 입력한 후 연산자를 입력해주세요!' 라는 경고 문구가 뜬다.
  - [o] 화면에 표시된 숫자가 0이 아닌 경우
    - [o] 연산자를 누를 경우
      - [o] 그 연산자가 = 키일 경우 
        - [o] 화면에 숫자만 있을 경우 아무 것도 하지 않는다.
        - [o] 그렇지 않을 경우 사칙연산을 수행하고, 계산기 화면이 바뀐다.
      - [o] =가 아닐 경우
        - [o] 화면에 마지막으로 표시된 문자가 연산자("/", "X", "-", "+")일 경우 '숫자를 먼저 입력한 후 연산자를 입력해주세요!' 라는 경고 문구가 뜬다.
        - [o] 화면에 마지막으로 표시된 문자가 연산자가 아닐 경우, 계산기 화면 끝으로 연산자가 추가된다.
    - [o] 숫자를 클릭할 경우 계산기 화면 끝으로 숫자가 추가된다.
- [o] 2개의 숫자에 대해 덧셈이 가능하다.
- [o] 2개의 숫자에 대해 뺄셈이 가능하다.
- [o] 2개의 숫자에 대해 곱셈이 가능하다.
- [o] 2개의 숫자에 대해 나눗셈이 가능하다.
- [o] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
- [o] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
- [o] 계산 결과를 표현할 때 소수점 이하는 버림한다.

*/

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
    // 화면에 표시된 숫자가 0이라면
    $("#total").innerText = e.target.innerText;
  } else {
    //화면에 표시된 숫자가 0이아니라면?
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
    //숫자만 있을 경우 아무 동작을 하지 않는다.
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
  // 연산자를 눌렀을 경우
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
      } else {
        firstNumber = Number($("#total").innerText);
        operator = e.target.innerText;
        $("#total").innerText += e.target.innerText;
        numberCount = 0;
      }
    }
  });
  // 숫자를 눌렀을 경우
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
  // AC(All Clear를 눌렀을 경우)
  $(".modifiers").addEventListener("click", (e) => {
    resetDisplay("0", 0);
  });
};

const app = new App();
app.init();

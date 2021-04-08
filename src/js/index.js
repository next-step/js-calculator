const digits = document.querySelectorAll(".digit");
const operations = document.querySelectorAll(".operation");
const total = document.getElementById("total");
let num = "";
const calcuList = [];

function onClickDigit(e) {
  if (num.length === 3) {
    alert("숫자는 세 자리까지만 입력 가능합니다!");
    return false;
  }
  const input = e.target.innerText;

  if (num === "" && input === "0") {
    return false;
  }

  num += input;
  setTotal(input);
}

function handleClickEqual() {
  switch (calcuList.length) {
    case 1: {
      total.innerText = calcuList[0];
      break;
    }
    case 2: {
      if (num === "") {
        total.innerText = calcuList[0];
        break;
      } else {
        calcuList.push(parseInt(num));
        num = "";
      }
    }
    case 3: {
      const result = calculator(...calcuList);
      total.innerText = result;
      num = result;
      calcuList.length = 0;
    }
  }
}

function onClickOperation(e) {
  const input = e.target.innerText;

  if (input === "=") {
    handleClickEqual();
    return false;
  }

  if (num.length === 0) {
    alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
    return false;
  }

  if (calcuList.length === 3 || (calcuList.length === 2 && num !== "")) {
    alert("2개의 숫자에 대해서만 계산 가능합니다.");
    return false;
  }

  calcuList.push(parseInt(num));
  calcuList.push(input);
  num = "";
  setTotal(input);
}

function calculator(first, operator, second) {
  let result = 0;
  switch (operator) {
    case "/": {
      result = Math.floor(first / second);
      break;
    }
    case "X": {
      result = first * second;
      break;
    }
    case "-": {
      result = first - second;
      break;
    }
    case "+": {
      result = first + second;
      break;
    }
  }
  return result;
}

function setTotal(text) {
  const currentTotal = total.innerText;
  total.innerText = currentTotal === "0" ? text : currentTotal + text;
}

function reset() {
  total.innerText = "0";
  num = "";
  calcuList.length = 0;
}

digits.forEach((digit) => {
  digit.addEventListener("click", onClickDigit);
});

operations.forEach((operation) => {
  operation.addEventListener("click", onClickOperation);
});

document.querySelector(".modifier").addEventListener("click", reset);

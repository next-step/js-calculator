let numBuffer = "";
let totalInnerText = 0;

let lValue = 0;
let operator = "";
let rValue = 0;

/**
 * AC누를 경우 초기 상태로 돌린다.
 */
const setInitialValue = () => {
  numBuffer = "";
  totalInnerText = 0;
  lValue = 0;
  operator = "";
  rValue = 0;
  putValueOnTotal(0);
};

/**
 * total에 innerText를 넣어준다.
 * 만약 아무것도 입력 되있지 않다면 value를 넣어준다.
 * 그렇지 않다면 concatnate 한다.
 */
const putValueOnTotal = (value) => {
  const totalDOM = document.getElementById("total");
  if (totalInnerText === 0) totalInnerText = value;
  else totalInnerText += value;
  totalDOM.innerText = totalInnerText;
};

const getTotalValue = () => {
  rValue = numBuffer;
  numBuffer = "";
  totalInnerText = 0;
  let value;
  switch (operator) {
    case "+":
      value = parseInt(lValue) + parseInt(rValue);
      lValue = value;
      putValueOnTotal(value);
      return;
    case "-":
      value = parseInt(lValue) - parseInt(rValue);
      lValue = value;
      putValueOnTotal(value);
      return;
    case "X":
      value = parseInt(lValue) * parseInt(rValue);
      lValue = value;
      putValueOnTotal(value);
      return;
    case "/":
      value = Math.floor(parseInt(lValue) / parseInt(rValue));
      lValue = value;
      console.log(lValue, value);
      putValueOnTotal(value);
      return;
    default:
      value = Infinity;
      lValue = value;
      putValueOnTotal(value);
      return;
  }
};

const getOperation = (e) => {
  if (lValue === 0) {
    alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
    return;
  }

  operator = e.target.innerText;
  putValueOnTotal(e.target.innerText);
};

const getNumber = (e) => {
  if (numBuffer.length >= 3) alert("숫자는 세 자리까지만 입력 가능합니다!");
  else {
    numBuffer += e.target.innerText;
    putValueOnTotal(e.target.innerText);
  }
};

const init = () => {
  const digitWrapper = document.getElementsByClassName("digits")[0];
  const modifierDOM = document.getElementsByClassName("modifier")[0];
  const operationWrapper = document.getElementsByClassName("operations")[0];
  digitWrapper.addEventListener("click", getNumber);
  modifierDOM.addEventListener("click", setInitialValue);
  operationWrapper.addEventListener("click", (e) => {
    if (lValue === 0 && numBuffer !== "") {
      lValue = numBuffer;
      numBuffer = "";
    }

    if (e.target.innerText === "=") getTotalValue();
    else getOperation(e);
  });
};

init();

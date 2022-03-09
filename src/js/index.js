const numberBtn = document.getElementById("number");
const totalCount = document.getElementById("total");
const clearBtn = document.getElementById("clear");
const operatorBtn = document.getElementById("operator");

const totalCountToArr = (unit) => totalCount.innerHTML.split(unit);
const isOperator = () => isNaN(Number(value));

const isMaxLength = () => {
  const curOperator = totalCountToArr("").find((v) => isOperator(v));
  if (curOperator) {
    return totalCountToArr(curOperator)[1].split("").length >= 3 ? true : false;
  } else {
    return totalCountToArr("").length >= 3 ? true : false;
  }
};

const addText = (text) => {
  const isFirstClick = totalCountToArr("")[0] === "0" ? true : false;

  if (isFirstClick) {
    totalCount.innerHTML = "";
  }

  if (isMaxLength() && !isOperator(text)) {
    onErrHandler("max Length");
  } else {
    totalCount.appendChild(document.createTextNode(text));
  }
};

const onErrHandler = (type) => {
  switch (type) {
    case "duplication operator":
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
      break;
    case "max Length":
      alert("숫자는 세 자리까지만 입력 가능합니다!");
      break;
    default:
      return;
  }
};

const sum = () => {
  const curOperator = totalCountToArr("").find((v) => isOperator(v));
  const valueArr = totalCountToArr(curOperator).map((v) => Number(v));

  switch (curOperator) {
    case "+":
      return valueArr[0] + valueArr[1];
    case "-":
      return valueArr[0] - valueArr[1];
    case "/":
      return valueArr[0] / valueArr[1];
    case "X":
      return valueArr[0] * valueArr[1];
  }
};

// EventListener

numberBtn.addEventListener("click", (e) => {
  const text = e.target.firstChild.nodeValue;
  addText(text);
});

clearBtn.addEventListener("click", (_) => {
  totalCount.innerHTML = "0";
});

operatorBtn.addEventListener("click", (e) => {
  const curOperator = e.target.firstChild.nodeValue;
  const isLastNodeIsNaN = isNaN(totalCount.innerHTML.split("").reverse()[0]);
  const isSum = e.target.firstChild.nodeValue === "=";
  if (isSum) {
    totalCount.innerHTML = sum() ?? totalCount.innerHTML;
  } else if (isLastNodeIsNaN) {
    onErrHandler("duplication operator");
  } else {
    addText(curOperator);
  }
});

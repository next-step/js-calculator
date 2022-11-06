const $ = (selector) => document.querySelector(selector);
const $calculator = $(".calculator");
const $total = $("#total");

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  X: (a, b) => a * b,
  "/": (a, b) => Math.floor(a / b),
};
const keyOfOperators = Object.keys(operators);

const putResult = () => {
  const method = $total.textContent
    .split("")
    .find((v) => keyOfOperators.includes(v));

  const firstNumber = $total.textContent.split(method).shift();
  const secondNumber = $total.textContent.split(method).pop();

  $total.textContent = operators[method](
    Number(firstNumber),
    Number(secondNumber)
  );
};

const putOperation = (operator) => {
  if (operator === "=") {
    putResult();
    return;
  }

  $total.textContent += operator;
};

const putNumber = (value) => {
  if ($total.textContent === "0") $total.textContent = value;
  else $total.textContent += value;
};

// event value 읽기
const handleClickValue = ({target}) => {
  if (target.classList.contains("digit")) {
    putNumber(target.textContent);
    return;
  }

  if (target.classList.contains("operation")) {
    putOperation(target.textContent);
    return;
  }

  if (target.classList.contains("modifier")) {
    $total.textContent = 0;
  }
};

// dom contact
$calculator.addEventListener("click", handleClickValue);

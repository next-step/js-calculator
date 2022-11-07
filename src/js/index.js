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
  lengthChecker.reset();

  if (operator === "=") {
    putResult();
    return;
  }

  $total.textContent += operator;
};

const lengthChecker = (() => {
  let length = 0;

  return {
    increase() {
      return length++;
    },

    check() {
      return length;
    },

    reset() {
      return (length = 0);
    },
  };
})();

const putNumber = (value) => {
  lengthChecker.increase();

  if (lengthChecker.check() > 3) {
    alert("숫자는 한번에 최대 3자리 수까지 입력 가능합니다!");
    return $total.textContent;
  }

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
    lengthChecker.reset();
    $total.textContent = 0;
  }
};

// dom contact
$calculator.addEventListener("click", handleClickValue);

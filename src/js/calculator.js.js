import {$total} from "./index.js";
import {
  PLUS,
  MINUS,
  MULTIPLICATION,
  DIVISION,
  ALERT_MESSAGE,
} from "./constants/constants.js";

const operators = {
  [PLUS]: (a, b) => a + b,
  [MINUS]: (a, b) => a - b,
  [MULTIPLICATION]: (a, b) => a * b,
  [DIVISION]: (a, b) => Math.floor(a / b),
};
const keyOfOperators = Object.keys(operators);

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

const putNumber = (value) => {
  lengthChecker.increase();

  if (lengthChecker.check() > 3) {
    alert(ALERT_MESSAGE);
    return $total.textContent;
  }

  if ($total.textContent === "0") $total.textContent = value;
  else $total.textContent += value;
};

export const handleClickValue = ({target}) => {
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

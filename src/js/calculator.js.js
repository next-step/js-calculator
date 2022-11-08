import {MAX_DIGIT_NUMBER, MESSAGE, OPERATOR} from "./constants/constants.js";
import {$} from "./utils/selector.js";

const $total = $("#total");

const operatorFunctionMap = {
  [OPERATOR.PLUS]: (a, b) => a + b,
  [OPERATOR.MINUS]: (a, b) => a - b,
  [OPERATOR.MULTIPLICATION]: (a, b) => a * b,
  [OPERATOR.DIVISION]: (a, b) => Math.floor(a / b),
};

const keyOfOperatorFuncMap = Object.keys(operatorFunctionMap);

const checkForMaxNumberOfDigits = (() => {
  let DIGIT_NUMBER = 0;

  return {
    increase() {
      return DIGIT_NUMBER++;
    },

    check() {
      return DIGIT_NUMBER;
    },

    reset() {
      return (DIGIT_NUMBER = 0);
    },
  };
})();

/** todo 명확히 개선 */
const putResult = () => {
  const operator = $total.textContent
    .split("")
    .find((v) => keyOfOperatorFuncMap.includes(v));

  const [firstNumber, secondNumber] = $total.textContent
    .split(operator)
    .map(Number);

  $total.textContent = operatorFunctionMap[operator](firstNumber, secondNumber);
};

const putOperation = (operator) => {
  checkForMaxNumberOfDigits.reset();

  if (operator === OPERATOR.EQUALS) {
    putResult();
    return;
  }

  $total.textContent += operator;
};

const putNumber = (number) => {
  checkForMaxNumberOfDigits.increase();

  if (checkForMaxNumberOfDigits.check() > MAX_DIGIT_NUMBER) {
    alert(MESSAGE.INVALID_NUMBER_SIZE);
    return $total.textContent;
  }

  if ($total.textContent === "0") $total.textContent = number;
  else $total.textContent += number;
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
    checkForMaxNumberOfDigits.reset();
    $total.textContent = 0;
  }
};

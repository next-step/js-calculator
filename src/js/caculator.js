import { $total } from "./view.js";
import { DEFAULT_NUMBER, MAX_DIGIT_LENGTH, operators } from "./constants.js";

export const isValidNumberInput = () => {
  const expression = $total.innerText;

  const operator = expression.split("").find((el) => Object.keys(operators).includes(el));

  if (!operator) {
    return expression.length < MAX_DIGIT_LENGTH;
  }

  const operands = expression.split(operator);

  return operands[1].length < MAX_DIGIT_LENGTH;
};

export const inputNumber = ({ target }) => {
  if ($total.innerText === DEFAULT_NUMBER) {
    $total.innerText = target.innerText;
    return;
  }

  if (!isValidNumberInput()) {
    alert("숫자는 3자리이상 입력할 수 없습니다.");
    return;
  }

  $total.innerText += target.innerText;
};

export const clearNumber = () => {
  $total.innerText = DEFAULT_NUMBER;
};

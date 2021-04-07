import { DISPLAY } from '../utils/DOM.js';

const isAbleAddOperator = () => {
  const displayValue = DISPLAY.innerText;
  if (DISPLAY.innerText === '0') {
    return false;
  }
  return !Number.isNaN(Number(displayValue[displayValue.length - 1]));
};

export const putOperator = ({ target }) => {
  if (target.innerText === '=') {
    return;
  }

  if (!isAbleAddOperator()) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return;
  }
  DISPLAY.innerText += target.innerText;
};

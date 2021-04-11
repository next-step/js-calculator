import { PLUS, MINUS, MULTIPLICATION, DIVISION, MESSAGE } from './constant';

export const calculation = ({ num1 = 0, num2 = 0, operator = '' }) => {
  if (!operator) {
    throw Error(MESSAGE.NEED_OPERATOR);
  }

  if (Number.isNaN(Number(num1)) || Number.isNaN(Number(num2))) {
    throw Error(MESSAGE.CHECK_INPUT_TYPE);
  }

  if (operator === DIVISION && num2 == 0) {
    return MESSAGE.IS_NOT_NUMBER;
  }

  const operators = {
    [PLUS]: () => Number(num1) + Number(num2),
    [MINUS]: () => Number(num1) - Number(num2),
    [MULTIPLICATION]: () => Number(num1) * Number(num2),
    [DIVISION]: () => Math.floor(num1 / num2),
  };

  return operators[operator]?.();
};

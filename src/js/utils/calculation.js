import { PLUS, MINUS, MULTIPLICATION, DIVISION, MESSAGE } from './constant';

export const calculation = ({ num1 = 0, num2 = 0, operator = '' }) => {
  if (!operator) {
    throw Error(MESSAGE.NEED_OPERATOR);
  }

  const operators = {
    [PLUS]: () => num1 + num2,
    [MINUS]: () => num1 - num2,
    [MULTIPLICATION]: () => num1 * num2,
    [DIVISION]: () => Math.round(num1 / num2),
  };

  return operators[operator]?.();
};

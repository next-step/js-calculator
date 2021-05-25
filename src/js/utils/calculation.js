import { PLUS, MINUS, MULTIPLICATION, DIVISION, MESSAGE, OPERATORS } from './constant';

export const calculation = ({ num1 = 0, num2 = 0, operator = '' }) => {
  if (!OPERATORS.includes(operator)) {
    throw Error(MESSAGE.NEED_OPERATOR);
  }

  if (Number.isNaN(Number(num1)) || Number.isNaN(Number(num2))) {
    throw Error(MESSAGE.CHECK_INPUT_TYPE);
  }

  const operators = {
    [PLUS]: () => Number(num1) + Number(num2),
    [MINUS]: () => Number(num1) - Number(num2),
    [MULTIPLICATION]: () => Number(num1) * Number(num2),
    [DIVISION]: () => (num2 == 0 ? MESSAGE.IS_NOT_NUMBER : Math.floor(num1 / num2)),
  };

  return operators[operator]();
};

import { PLUS, MINUS, MULTIPLICATION, DIVISION } from './constant';

export const calculation = ({ num1 = 0, num2 = 0, operator = '' }) => {
  if (!operator) {
    throw Error('계산을 하기 위해서는 연산자가 필요합니다. ');
  }

  const operators = {
    [PLUS]: () => num1 + num2,
    [MINUS]: () => num1 - num2,
    [MULTIPLICATION]: () => num1 * num2,
    [DIVISION]: () => Math.round(num1 / num2),
  };

  return operators[operator]?.();
};

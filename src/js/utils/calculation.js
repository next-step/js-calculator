export const calculation = ({ num1 = 0, num2 = 0, operator = '' }) => {
  if (!operator) {
    throw Error('계산을 하기 위해서는 연산자가 필요합니다. ');
  }

  const operators = {
    '+': () => num1 + num2,
    '-': () => num1 - num2,
    X: () => num1 * num2,
    '/': () => Math.round(num1 / num2),
  };

  return operators[operator]?.();
};

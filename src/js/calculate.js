export const calculate = (operation, firstNum, secondNum) => {
  switch (operation) {
    case '+':
      return plus(firstNum, secondNum);
    case '-':
      return minus(firstNum, secondNum);
    case 'X':
      return multiply(firstNum, secondNum);
    case '/':
      return divide(firstNum, secondNum);
  }
};

const plus = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const minus = (firstNum, secondNum) => {
  return firstNum - secondNum;
};

const multiply = (firstNum, secondNum) => {
  return firstNum * secondNum;
};

const divide = (firstNum, secondNum) => {
  const result = firstNum / secondNum;
  if (result > 0) {
    return Math.floor(firstNum / secondNum);
  } else {
    return Math.ceil(firstNum / secondNum);
  }
};

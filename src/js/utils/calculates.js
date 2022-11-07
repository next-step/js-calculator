export const getTotal = ({ operation, total }) => {
  const [firstNum, secondNum] = total.split(operation);

  let newTotal = '';
  switch (operation) {
    case '+':
      newTotal = `${+firstNum + +secondNum}`;
      break;
    case '-':
      newTotal = `${+firstNum - +secondNum}`;
      break;
    case 'X':
      newTotal = `${+firstNum * +secondNum}`;
      break;
    case '/':
      newTotal = `${+firstNum / +secondNum}`;
      break;
  }
  return {
    total: newTotal,
    digitCount: 0,
  };
};

const handler = (num1, num2, operator) => {
  const actions = {
    X: () => num1 * num2,
    "+": () => num1 + num2,
    "-": () => num1 - num2,
    "/": () => Math.floor(num1 / num2),
  };
  return actions[operator]();
};

const operator = (expression) => {
  if (expression.indexOf("X") !== -1 || expression.indexOf("/") !== -1) {
    expression.forEach((value, index) => {
      if (value === "X" || value === "/") {
        const num1 = expression[index - 1];
        const num2 = expression[index + 1];
        const result = handler(num1, num2, value);
        expression.splice(index - 1, 3, result);
      }
    });
  }

  if (expression.indexOf("-") !== -1 || expression.indexOf("+") !== -1) {
    expression.forEach((value, index) => {
      if (value === "-" || value === "+") {
        const num1 = expression[index - 1];
        const num2 = expression[index + 1];
        const result = handler(num1, num2, value);
        expression.splice(index - 1, 3, result);
      }
    });
  }
  return expression[0];
};

export default operator;

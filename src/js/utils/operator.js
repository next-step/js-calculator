const operator = (number1, number2, operator) => {
  number1 = parseInt(number1);
  number2 = parseInt(number2);
  const operations = {
    "+": () => number1 + number2,
    "-": () => number1 - number2,
    "/": () => number1 / number2,
    "*": () => number1 * number2,
  };
  return operations[operator];
};

export default operator;

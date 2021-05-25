const calculator = (type, left, right) => {
  switch (type) {
    case "+":
      return +left + +right;
    case "-":
      return +left - +right;
    case "X":
      return +left * +right;
    case "/":
      return Math.floor(+left / +right);
  }
};

export default calculator;

import calculate from "./calculate.js";

const operates = {
  "+": (num1, num2) => calculate.plus(Number(num1), Number(num2)),
  "-": (num1, num2) => calculate.minus(Number(num1), Number(num2)),
  X: (num1, num2) => calculate.multiply(Number(num1), Number(num2)),
  "/": (num1, num2) => calculate.divide(Number(num1), Number(num2)),
};

export default operates;

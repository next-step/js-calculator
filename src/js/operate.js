export default class Operate {
  sum(num1, num2) {
    return +num1 + +num2;
  }

  subtract(num1, num2) {
    return +num1 - +num2;
  }

  multiple(num1, num2) {
    return +num1 * +num2;
  }

  divide(num1, num2) {
    const res = +num1 / +num2;
    return Math.floor(res);
  }
}

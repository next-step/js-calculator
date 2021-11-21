export function calculate(num1, op, num2) {
  switch (op) {
    case '+':
      return num1 + num2;
      break;
    case '-':
      return num1 - num2;
      break;
    case 'X':
      return num1 * num2;
      break;
    case '/':
      const result = Number.parseInt(num1 / num2);
      return Number.isNaN(result) ? 0 : result;
      break;
  }
}

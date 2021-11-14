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
      return Number.parseInt(num1 / num2);
      break;
  }
}

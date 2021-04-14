
export default function Operator(operator, operand1, operand2) {
  const [op1, op2] = [parseInt(operand1), parseInt(operand2)];
  const operators = {
    '+': () => op1 + op2,
    '-': () => op1 - op2,
    'X': () => op1 * op2, 
    '/': () => Math.floor(op1 / op2)
  };

  return operators[operator]();
}
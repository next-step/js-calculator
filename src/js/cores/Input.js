export default function Input(calculator, validator) {
  const inputNumber = (numberText) => {
    const numbers = calculator.numbers;
    const operators = calculator.operators;

    if (!validator.validateBeforeInputNumber(numbers, operators)) return;

    calculator.inputNumber(numberText);
  };

  const inputOperator = (operator) => {
    const numbers = calculator.numbers;
    const operators = calculator.operators;

    if (!validator.validateBeforeInputOperator(numbers, operators)) return;

    calculator.inputOperator(operator);
  };

  const getNumbersAndOperators = () => {
    return calculator.getNumbersAndOperators();
  };

  const clearNumbersAndOperators = () => {
    calculator.clearNumbersAndOperators();
  };

  return {
    inputNumber,
    inputOperator,
    getNumbersAndOperators,
    clearNumbersAndOperators,
  };
}

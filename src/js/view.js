export default function View(rootElement, calculator) {
  const initialize = () => {
    addEventListeners();
  };

  const addEventListeners = () => {
    rootElement
      .querySelector('.calculator')
      .addEventListener('click', handleButtonClick);
  };

  const handleButtonClick = (event) => {
    const { dataset } = event.target;

    if ('number' in dataset) return inputNumber(dataset.number);

    if ('operator' in dataset) return inputOperator(dataset.operator);

    if ('ac' in dataset) return clearNumbersAndOperators();
  };

  const inputNumber = (number) => {
    calculator.inputNumber(number);
    renderNumberAndOperators();
  };

  const inputOperator = (operator) => {
    calculator.inputOperator(operator);
    renderNumberAndOperators();
  };

  const clearNumbersAndOperators = () => {
    calculator.clearNumbersAndOperators();
    renderNumberAndOperators();
  };

  const renderNumberAndOperators = () => {
    rootElement.querySelector('#total').innerText = calculator
      .getNumbersAndOperators()
      .join('');
  };

  return {
    initialize,
  };
}

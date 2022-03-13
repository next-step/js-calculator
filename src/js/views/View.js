const NUMBER = 'number';
const OPERATOR = 'operator';
const ALL_CLEAR = 'ac';

export default function View(rootElement, input) {
  const initialize = () => {
    renderNumberAndOperators();
    addEventListeners();
  };

  const addEventListeners = () => {
    rootElement
      .querySelector('.calculator')
      .addEventListener('click', handleButtonClick);
  };

  const handleButtonClick = (event) => {
    const { dataset } = event.target;

    if (NUMBER in dataset) return inputNumber(dataset.number);

    if (OPERATOR in dataset) return inputOperator(dataset.operator);

    if (ALL_CLEAR in dataset) return clearNumbersAndOperators();
  };

  const inputNumber = (number) => {
    input.inputNumber(number);
    renderNumberAndOperators();
  };

  const inputOperator = (operator) => {
    input.inputOperator(operator);
    renderNumberAndOperators();
  };

  const clearNumbersAndOperators = () => {
    input.clearNumbersAndOperators();
    renderNumberAndOperators();
  };

  const renderNumberAndOperators = () => {
    rootElement.querySelector('#total').innerText = input
      .getNumbersAndOperators()
      .join('');
  };

  return {
    initialize,
  };
}

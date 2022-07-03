import { OPERATIONS_LABEL } from '../constants.js';

export default function useDisplay() {
  const $target = document.querySelector('#total');

  const render = value => {
    $target.textContent = value;
  };

  const setDisplay = value => {
    render(value);
  };

  const getDisplay = () => $target.textContent;

  const getDisplayOperator = () => {
    const array = getDisplay().split('');
    const operator = array.find(char => Object.values(OPERATIONS_LABEL).includes(char));
    return operator;
  };

  const getDisplayNumbers = () => getDisplay().split(getDisplayOperator());

  return {
    render,
    setDisplay,
    getDisplay,
    getDisplayOperator,
    getDisplayNumbers,
  };
}

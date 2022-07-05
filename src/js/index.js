import { INITIAL_STATE } from './constants';

import { calculate, isOverLength } from './utils';

const $app = document.querySelector('#app');

const render = ({ accumulator, number, operator }) => {
  if (isOverLength(number)) {
    return;
  }

  function handleClickNumber(clickedNumber) {
    render({
      accumulator,
      number: number * 10 + clickedNumber,
      operator,
    });
  }

  function handleClickOperator(clickedOperator) {
    render({
      accumulator: Math.floor(calculate(operator, accumulator, number)),
      number: null,
      operator: clickedOperator,
    });
  }

  const element = `
          <div class="calculator">
            <h1 id="total">${number || accumulator}</h1>
            <div class="digits flex">
              <button class="digit">9</button>
              <button class="digit">8</button>
              <button class="digit">7</button>
              <button class="digit">6</button>
              <button class="digit">5</button>
              <button class="digit">4</button>
              <button class="digit">3</button>
              <button class="digit">2</button>
              <button class="digit">1</button>
              <button class="digit">0</button>
            </div>
            <div class="modifiers subgrid">
              <button class="modifier">AC</button>
            </div>
            <div class="operations subgrid">
              <button class="operation">/</button>
              <button class="operation">X</button>
              <button class="operation">-</button>
              <button class="operation">+</button>
              <button class="operation">=</button>
            </div>
          </div>
        `;

  $app.innerHTML = element;

  const numbers = document.querySelector('.digits');
  const operations = document.querySelector('.operations');
  const clearButton = document.querySelector('.modifiers');

  numbers.addEventListener('click', (e) => {
    handleClickNumber(+e.target.firstChild.nodeValue);
  });

  operations.addEventListener('click', (e) => {
    handleClickOperator(e.target.firstChild.nodeValue);
  });

  clearButton.addEventListener('click', () => {
    render(INITIAL_STATE);
  });
};

render(INITIAL_STATE);

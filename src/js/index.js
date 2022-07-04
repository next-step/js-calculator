const $app = document.querySelector('#app');

const calculatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => y && x / y,
};

function defaultCalculatorFunction(x, y) {
  return y === null ? x : y;
}

function calculate(operator, accumulator, number) {
  return (calculatorFunctions[operator] || defaultCalculatorFunction)(accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
};

const render = ({ accumulator, number, operator }) => {
  const isOverLength = (input) => (input && (`${input}`).length > 3);

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
    render(initialState);
  });
};

render(initialState);

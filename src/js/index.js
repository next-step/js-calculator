class Calculator {
  // TODO:모듈화
  num1 = 0;
  num2 = 0;
  op = null;
  current = 0;

  add(n, m) {
    return n + m;
  }
  subtract(n, m) {
    return n - m;
  }
  multiply(n, m) {
    return n * m;
  }
  divide(n, m) {
    return Math.floor(n / m);
  }

  initialize() {
    this.num1 = 0;
    this.num2 = 0;
    this.op = null;
    this.current = 0;
  }
}

const calculator = new Calculator();
let total = null;

window.addEventListener('load', function () {
  total = document.querySelector('#total');
  addEventListenerForDigits();
  addEventListenerForOperations();
  addEventListenerForModifiers();
});

function addEventListenerForModifiers() {
  document.querySelector('.modifier').addEventListener('click', function () {
    calculator.initialize();
    setDisplay(0);
  });
}

function addEventListenerForDigits() {
  const digits = document.querySelectorAll('.digit');
  digits.forEach((digit) =>
    digit.addEventListener('click', function () {
      accumulateTotalNumber(parseInt(this.innerText));
      updateDisplay();
    })
  );
}

function addEventListenerForOperations() {
  const operations = document.querySelectorAll('.operation');
  operations.forEach((op) => {
    op.addEventListener('click', function () {
      setOperation(this.innerText);
    });
  });
}

function setOperation(operation) {
  console.log(operation, '누름');
  if (operation === '=') {
    const operationFunction = {
      '+': calculator.add,
      '-': calculator.subtract,
      x: calculator.multiply,
      '/': calculator.divide,
    };
    calculator.num2 = calculator.current;
    const op = calculator.op.toLowerCase();
    calculator.current = operationFunction[op](
      calculator.num1,
      calculator.num2
    );
    setDisplay(calculator.current);
    return;
  }
  calculator.num1 = calculator.current;
  calculator.op = operation;
  clearTotal();
}

function accumulateTotalNumber(number = 0) {
  if (calculator.op && calculator.current === 0) {
    clearTotal();
  }

  const { current } = calculator;
  if (current > 99) return;
  calculator.current = current * 10 + number;
}

function updateDisplay() {
  if (!total) return;
  total.innerText = calculator.current;
}

function clearTotal() {
  calculator.current = 0;
}

function setDisplay(num) {
  total.innerText = num;
}

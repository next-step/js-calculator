class Calculator {
  // TODO:모듈화
  num1 = 0;
  num2 = 0;
  op = null;
  total = 0;

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
    return n / m;
  }
}

const calculator = new Calculator();

window.addEventListener('load', function () {
  addEventListenerForDigits();
});

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
  calculator.op = operation;
}
// const operationFunction = {
//     '+': calculator.add,
//     '-': calculator.subtract,
//     '*': calculator.multiply,
//     '/': calculator.divide
// }

function accumulateTotalNumber(number = 0) {
  const { total } = calculator;
  if (total > 99) return;
  calculator.total = total * 10 + number;
}

function updateDisplay() {
  const total = document.querySelector('#total');
  if (!total) return;
  total.innerText = calculator.total;
}

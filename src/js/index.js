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
  const nodes = document.querySelectorAll('.digit');
  nodes.forEach((node) =>
    node.addEventListener('click', function () {
      accumulateTotalNumber(parseInt(this.innerText));
      updateDisplay();
    })
  );
}

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

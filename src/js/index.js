(() => {
  const model = new Model();
  const digits = document.querySelector('.digits');
  const operations = document.querySelector('.operations');
  const total = document.querySelector('#total');
  const ac = document.querySelector('.modifier');

  digits.onclick = (e) => {
    model.setCurrentNumber(e.target.textContent);
    total.textContent = model.getCurrentNumber();
  };

  operations.onclick = (e) => {
    const operator = e.target.textContent;
    model.calculate();
    if (operator === OPERATOR.EQUAL) {
      total.textContent = model.getTotal();
    } else {
      model.setCurrentOperator(e.target.textContent);
      total.textContent = model.getCurrentOperator();
    }
  };

  ac.onclick = () => {
    model.reset();
    total.textContent = model.getTotal();
  };
})();

(() => {
  const model = new Model();
  const digits = document.querySelector('.digits');
  const operations = document.querySelector('.operations');
  const total = document.querySelector('#total');

  digits.onclick = (e) => {
    model.setCurrentNumber(e.target.innerText);
    total.innerText = model.getCurrentNumber();
  }

  operations.onclick = (e) => {
    const operator = e.target.innerText;
    if (operator === '=') {
      total.innerText = model.getTotal();
    } else {
      model.setCurrentOperator(e.target.innerText);
      total.innerText = model.getCurrentOperator();
    }
  }
})();

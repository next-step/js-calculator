const controller = (calculator) => {
  const $digits = document.querySelector('.digits');
  const $operations = document.querySelector('.operations');
  const $modifier = document.querySelector('.modifier');

  $digits.addEventListener('click', (e) => {
    const value = e.target.textContent;
    calculator.input(value);
  });

  $operations.addEventListener('click', (e) => {
    const value = e.target.textContent;
    calculator.input(value);
  });

  $modifier.addEventListener('click', () => {
    calculator.clear();
  });
};

export default controller;

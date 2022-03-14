const controller = (calculator) => {
  const $calc = document.querySelector('.calculator');

  $calc.addEventListener('click', (e) => {
    const eventClassName = e.target.className;
    const value = e.target.textContent;

    if (eventClassName === 'digit') calculator.input(value);
    if (eventClassName === 'operation' && value !== '=')
      calculator.input(value);

    if (eventClassName === 'operation' && value === '=') calculator.calculate();

    if (eventClassName === 'modifier') calculator.allClear();
  });
};

export default controller;

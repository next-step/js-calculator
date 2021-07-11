const $calculator = document.querySelector<HTMLElement>('.calculator')!;
const $result = $calculator.querySelector<HTMLElement>('#total')!;

let lOperland = '';
let rOperland = '';
let operator = '';
let lSign = 1;
let rSign = 1;

$calculator.addEventListener('click', function handleClick(evt) {
  const target = evt.target as HTMLElement;

  if (target.classList.contains('digit')) {
    if (operator) {
      if (rOperland.length >= 3) return;
      rOperland += target.textContent!;
      $result.textContent = rOperland;
    } else {
      if (lOperland.length >= 3) return;
      lOperland += target.textContent!;
      $result.textContent = lOperland;
    }
  }

  if (target.classList.contains('operation')) {
    if (target.textContent === '=') {
      const lValue = lSign * +lOperland;
      const rValue = rSign * +rOperland;
      let result;

      switch (operator) {
        case '+':
          result = lValue + rValue;
          break;
        case '-':
          result = lValue - rValue;
          break;
        case 'X':
          result = lValue * rValue;
          break;
        case '/':
          result = lValue / rValue;
          break;
        default:
          return;
      }

      $result.textContent = `${Math.floor(result)}`;
    } else if (target.textContent === '-') {
      if (!lOperland) return (lSign *= -1);
      if (!operator) return (operator = target.textContent);
      if (!rOperland) return (rSign *= -1);
    } else {
      operator = target.textContent!;
    }
  }

  if (target.classList.contains('modifier')) {
    lOperland = '';
    operator = '';
    rOperland = '';
    $result.textContent = '0';
  }
});

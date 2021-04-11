export default function calculator(rootComponent) {
  const $total = document.getElementById('total');
  const $digits = document.querySelector('.digits');
  const $modifiers = document.querySelector('.modifiers');
  const $operations = document.querySelector('.operations');

  function digitsClickEvent({ target }) {
    const digit = target.textContent;

    rootComponent.dispatchEvent(new CustomEvent('digits', { detail: digit }));
  }
  $digits.addEventListener('click', digitsClickEvent);

  function operationsClickEvent({ target }) {
    const operation = target.textContent;

    if (operation === '=') {
      rootComponent.dispatchEvent(new CustomEvent('calculate'));
      const selected = $operations.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
      return;
    }

    target.classList.add('selected');
    rootComponent.dispatchEvent(new CustomEvent('op', { detail: operation }));
  }
  $operations.addEventListener('click', operationsClickEvent);

  function modifiersClickEvent({ target }) {
    const action = target.dataset.action;

    if (action === 'ac') {
      clear();
      rootComponent.dispatchEvent(new CustomEvent('ac'));
    }
  }
  $modifiers.addEventListener('click', modifiersClickEvent);

  function clear() {
    $total.textValue = '0';
    const selected = $operations.querySelector('selected');
    if (selected) {
      selected.classList.remove('selected');
    }
  }

  function render(total) {
    $total.textContent = total;
  }

  return {
    render,
  };
}

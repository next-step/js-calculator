export default function calculator(rootComponent) {
  const $total = document.getElementById('total');

  function render(total) {
    $total.textContent = total;
  }

  initEventListeners(rootComponent, $total);

  return {
    render,
  };
}

function initEventListeners(rootComponent, $total) {
  const $digits = document.querySelector('.digits');
  const $modifiers = document.querySelector('.modifiers');
  const $operations = document.querySelector('.operations');

  function digitsClickEventListener({ target }) {
    const digit = target.textContent;

    rootComponent.dispatchEvent(new CustomEvent('digits', { detail: digit }));
  }

  function operationsClickEventListener({ target }) {
    const operation = target.textContent;
    clearOperations($operations);

    if (operation === '=') {
      rootComponent.dispatchEvent(new CustomEvent('calculate'));
      return;
    }

    target.classList.add('selected');
    rootComponent.dispatchEvent(new CustomEvent('op', { detail: operation }));
  }

  function modifiersClickEventListener({ target }) {
    const action = target.dataset.action;

    if (action === 'ac') {
      clear();
      rootComponent.dispatchEvent(new CustomEvent('ac'));
    }
  }

  function clear() {
    $total.textValue = '0';
    clearOperations($operations);
  }

  function clearOperations($operations) {
    const selected = $operations.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    }
  }

  $digits.addEventListener('click', digitsClickEventListener);
  $operations.addEventListener('click', operationsClickEventListener);
  $modifiers.addEventListener('click', modifiersClickEventListener);
}

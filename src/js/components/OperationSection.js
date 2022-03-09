import OperationSectionButton from './OperationSectionButton.js';

const operators = Object.freeze([
  ['DIVIDE', '/'],
  ['MULTIPLY', 'X'],
  ['MINUS', '-'],
  ['PLUS', '+'],
  ['CALCULATE', '='],
]);

export default class OperationSection {
  #target;

  constructor($target) {
    this.#target = $target;

    const $operation = document.createElement('div');
    $operation.className = 'operations subgrid';

    operators.map(
      operator => new OperationSectionButton($operation, { operator })
    );

    this.#target.appendChild($operation);
  }
}

import OperationSectionButton from './OperationSectionButton.js';

const operators = Object.freeze(['/', 'X', '-', '+', '=']);

export default class OperationSection {
  #target;

  constructor($target, { onClick }) {
    this.#target = $target;

    const $operation = document.createElement('div');
    $operation.className = 'operations subgrid';

    operators.map(
      operator => new OperationSectionButton($operation, { operator, onClick })
    );

    this.#target.appendChild($operation);
  }
}

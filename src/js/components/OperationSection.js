import OperationSectionButton from './OperationSectionButton.js';

export default class OperationSection {
  #target;

  constructor($target, { onClick, OPERATORS }) {
    this.#target = $target;

    const $operation = document.createElement('div');
    $operation.className = 'operations subgrid';

    OPERATORS.map(
      operator => new OperationSectionButton($operation, { operator, onClick })
    );

    this.#target.appendChild($operation);
  }
}

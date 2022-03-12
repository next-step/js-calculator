import OperationSectionButton from './OperationSectionButton.js';

export default class OperationSection {
  constructor($target, { onClick, OPERATORS }) {
    const $operation = document.createElement('div');
    $operation.className = 'operations subgrid';

    OPERATORS.map(
      operator => new OperationSectionButton($operation, { operator, onClick })
    );

    $target.appendChild($operation);
  }
}

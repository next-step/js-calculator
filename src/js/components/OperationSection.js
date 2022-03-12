import OperationSectionButton from './OperationSectionButton.js';

const OperationSection = ($target, { onClick, OPERATORS }) => {
  const $operation = document.createElement('div');
  $operation.className = 'operations subgrid';

  OPERATORS.map(operator =>
    OperationSectionButton($operation, { operator, onClick })
  );

  $target.appendChild($operation);
};

export default OperationSection;

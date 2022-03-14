export default function OperationSectionButton($target, { operator, onClick }) {
  const $operationBtn = document.createElement('button');
  $operationBtn.className = 'operation';
  $operationBtn.textContent = operator;
  $operationBtn.dataset.value = operator;
  $operationBtn.addEventListener('click', onClick);
  $target.appendChild($operationBtn);
}

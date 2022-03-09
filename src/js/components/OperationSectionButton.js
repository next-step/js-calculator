export default class OperationSectionButton {
  #target;

  constructor($target, { operator, onClick }) {
    this.#target = $target;

    const $operationBtn = document.createElement('button');
    $operationBtn.className = 'operation';
    $operationBtn.textContent = operator;
    $operationBtn.dataset.value = operator;
    $operationBtn.addEventListener('click', onClick);

    this.#target.appendChild($operationBtn);
  }
}

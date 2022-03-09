export default class OperationSectionButton {
  #target;

  constructor($target, { operator }) {
    this.#target = $target;

    const $operationBtn = document.createElement('button');
    $operationBtn.className = 'operation';
    $operationBtn.textContent = operator[1];
    $operationBtn.dataset.value = operator[0];

    this.#target.appendChild($operationBtn);
  }
}

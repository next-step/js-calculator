export default class ModifierSectionButton {
  #target;

  constructor($target) {
    this.#target = $target;

    const $modifiersBtn = document.createElement('button');
    $modifiersBtn.className = 'modifier';
    $modifiersBtn.textContent = 'AC';

    this.#target.appendChild($modifiersBtn);
  }
}

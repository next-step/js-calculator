export default class ModifierSectionButton {
  #target;

  constructor($target, { onClick }) {
    this.#target = $target;

    const $modifiersBtn = document.createElement('button');
    $modifiersBtn.className = 'modifier';
    $modifiersBtn.textContent = 'AC';
    $modifiersBtn.addEventListener('click', onClick);

    this.#target.appendChild($modifiersBtn);
  }
}

import ModifierSectionButton from './ModifierSectionButton.js';

export default class ModifiersSection {
  #target;

  constructor($target) {
    this.#target = $target;

    const $modifiers = document.createElement('div');
    $modifiers.className = 'modifiers subgrid';

    new ModifierSectionButton($modifiers);

    this.#target.appendChild($modifiers);
  }
}

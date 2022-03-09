import ModifierSectionButton from './ModifierSectionButton.js';

export default class ModifiersSection {
  #target;

  constructor($target, { onClick }) {
    this.#target = $target;

    const $modifiers = document.createElement('div');
    $modifiers.className = 'modifiers subgrid';

    new ModifierSectionButton($modifiers, { onClick });

    this.#target.appendChild($modifiers);
  }
}

import ModifierSectionButton from './ModifierSectionButton.js';

export default class ModifiersSection {
  constructor($target, { onClick }) {
    const $modifiers = document.createElement('div');
    $modifiers.className = 'modifiers subgrid';
    new ModifierSectionButton($modifiers, { onClick });
    $target.appendChild($modifiers);
  }
}

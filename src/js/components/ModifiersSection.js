import ModifierSectionButton from './ModifierSectionButton.js';

const ModifiersSection = ($target, { onClick }) => {
  const $modifiers = document.createElement('div');
  $modifiers.className = 'modifiers subgrid';
  ModifierSectionButton($modifiers, { onClick });
  $target.appendChild($modifiers);
};
export default ModifiersSection;

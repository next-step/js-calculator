const ModifierSectionButton = ($target, { onClick }) => {
  const $modifiersBtn = document.createElement('button');
  $modifiersBtn.className = 'modifier';
  $modifiersBtn.textContent = 'AC';
  $modifiersBtn.addEventListener('click', onClick);

  $target.appendChild($modifiersBtn);
};
export default ModifierSectionButton;

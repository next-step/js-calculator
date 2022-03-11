import { DOM } from '../constants.js';

class Modifiers {
  constructor(target, onClick) {
    this.onClick = onClick;
    this.$target = target;
    this.initEventListeners();
  }

  initEventListeners() {
    this.$target.addEventListener('click', this.onClickModifiers.bind(this));
  }

  onClickModifiers(event) {
    const clickedModifier = event.target.closest(DOM.modifier).innerHTML;
    this.onClick(clickedModifier);
  }
}

export default Modifiers;

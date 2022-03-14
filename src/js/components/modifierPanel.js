import { $, SELECTORS } from '../utils/selector.js';

export default function ModifierPanel({ onClick }) {
  this.$modifierPanel = $(SELECTORS.CLASS.MODIFIER);

  this.setState = () => {};
  this.render = () => {};

  this.modifierPanelHandler = () => {
    onClick();
  };

  this.$modifierPanel.addEventListener('click', this.modifierPanelHandler);
}

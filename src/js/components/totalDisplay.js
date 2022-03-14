import { $, SELECTORS } from '../utils/selector.js';

export default function TotalDisplay({ initState }) {
  this.$totalDisplay = $(SELECTORS.ID.TOTAL);

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    this.$totalDisplay.textContent = this.state || '0';
  };

  this.render();
}

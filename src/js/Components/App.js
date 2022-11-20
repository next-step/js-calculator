import component from '../core/component.js';
import CalculateTotal from './CalculateTotal.js';
import { checkExceedDigit } from '../utils/validate.js';
import { calculateOperation } from '../utils/calculate.js';

export default class App extends component {
  constructor($target, state) {
    super($target, state);
    this.calculateTotal = new CalculateTotal(
      this.$target.querySelector('#total'),
      this.state
    );
    this.setEvent();
  }

  setState(nextState) {
    this.state = nextState;
    this.calculateTotal.setState(this.state);
  }

  calculate = (newValue, newType) => {
    let newState = {};
    try {
      switch (newType) {
        case 'digit':
          if (checkExceedDigit(this.state.digitCount)) {
            newState = {
              total: `${this.state.total}${newValue}`,
              digitCount: this.state.digitCount + 1,
            };
          }
          break;

        case 'operation':
          newState = calculateOperation({ state: this.state, newValue });
          break;

        case 'modifier':
          newState = {
            total: '',
            digitCount: 0,
            operation: '',
          };
          break;
      }
    } catch (e) {
      alert(e.message);
    }

    this.state = { ...this.state, ...newState };
    this.setState(this.state);
  };

  setEvent = () => {
    const handleButtOnClick = (e) => {
      const buttonType = e.target.className;
      const buttonValue = e.target.innerHTML;

      if (buttonType.length > 0) {
        this.calculate(buttonValue, buttonType);
      }
    };

    this.$target.addEventListener('click', handleButtOnClick);
  };
}

import CalculateTotal from './CalculateTotal.js';
import { operationOnclick } from './utils/calculate.js';
import { checkExceedDigit } from './utils/validate.js';

export default function App({ $app, initialState }) {
  this.state = initialState;
  this.calculateTotal = new CalculateTotal({ $app, state: this.state.total });

  this.onClick = (newValue, type) => {
    let newState = {};

    switch (type) {
      case 'digit':
        if (checkExceedDigit(this.state.digitCount)) {
          newState = {
            total: `${this.state.total}${newValue}`,
            digitCount: this.state.digitCount + 1,
          };
        }
        break;

      case 'operation':
        newState = operationOnclick({ state: this.state, newValue });
        break;

      case 'modifier':
        newState = {
          total: '',
          digitCount: 0,
          operation: '',
        };
        break;
    }

    this.state = { ...this.state, ...newState };
    this.setState(this.state);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.calculateTotal.setState(this.state);
  };

  $app.addEventListener('click', (e) => {
    const buttonType = e.target.className;
    const buttonValue = e.target.innerHTML;

    if (buttonType) {
      this.onClick(buttonValue, buttonType);
    }
  });
}

import CalculateTotal from './Components/CalculateTotal.js';
import { calculateOperation } from './utils/calculate.js';
import { checkExceedDigit, checkInitialState } from './utils/validate.js';

export default function App({
  $app,
  initialState = { total: '', digitCount: 0, operation: '' },
}) {
  this.state = checkInitialState(initialState);
  this.calculateTotal = new CalculateTotal({
    $total: $app.querySelector('#total'),
    state: this.state.total,
  });

  this.calculate = (newValue, newType) => {
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

  this.setState = (nextState) => {
    this.state = nextState;
    this.calculateTotal.setState(this.state);
    console.log(this.state);
  };

  const handleButtOnClick = (e) => {
    const buttonType = e.target.className;
    const buttonValue = e.target.innerHTML;

    if (buttonType.length > 0) {
      this.calculate(buttonValue, buttonType);
    }
  };

  $app.addEventListener('click', handleButtOnClick);
}

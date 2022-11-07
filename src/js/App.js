import CalculateTotal from './CalculateTotal.js';
import { getTotal } from './utils/calculates.js';

export default function App({ $app, initialState }) {
  this.state = initialState;

  // total 렌더링
  this.calculateTotal = new CalculateTotal({ $app, state: this.state.total });

  // 버튼 클릭 감지하고 계산하기
  this.onClick = (newValue, type) => {
    let newState = {};

    switch (type) {
      case 'digit':
        newState = {
          total: `${this.state.total}${newValue}`,
          digitCount: this.state.digitCount + 1,
        };
        break;
      case 'operation':
        switch (newValue) {
          case '=':
            newState = getTotal({
              operation: this.state.operation,
              total: this.state.total,
            });
            break;
          default:
            newState = {
              total: `${this.state.total}${newValue}`,
              digitCount: 0,
              operation: newValue,
            };
            break;
        }
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

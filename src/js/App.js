import CalculateTotal from './CalculateTotal.js';

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
        if (newValue === '+') {
          newState = {
            total: `${this.state.total}${newValue}`,
            digitCount: 0,
          };
        } else if (newValue === '=') {
          const [firstNum, secondNum] = this.state.total.split('+');
          newState = {
            total: `${+firstNum + +secondNum}`,
            digitCount: 0,
          };
        }
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

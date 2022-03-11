import { ALERT_MESSAGE, OPERATION, DIGIT_NUMBER_MEX_LENGTH } from './constants.js';
import { $ } from './utils.js';

function App() {
  this.state = {
    total: '0',
    firstNumber: '',
    secondNumber: '',
    operator: '',
  };

  this.init = () => {
    initEventListeners();
  };

  const render = () => {
    $('#total').textContent = this.state.total;
  };

  const resetState = () => {
    this.state.total = '0';
    this.state.firstNumber = '';
    this.state.secondNumber = '';
    this.state.operator = '';
  };

  const operations = {
    [OPERATION.PLUS]: (a, b) => Number(a) + Number(b),
    [OPERATION.MINUS]: (a, b) => Number(a) - Number(b),
    [OPERATION.MULTIPLICATION]: (a, b) => Number(a) * Number(b),
    [OPERATION.DIVISION]: (a, b) => Number(a) / Number(b),
  };

  const calculate = () => {
    if (!this.state.secondNumber) {
      this.state.operator = '';
      this.state.total = this.state.firstNumber;
    } else {
      const total = Math.floor(operations[this.state.operator](this.state.firstNumber, this.state.secondNumber)) + '';
      resetState();
      this.state.firstNumber = total;
      this.state.total = total;
    }
    render();
  };

  const getDigitNumber = (number, $digit) => {
    if (DIGIT_NUMBER_MEX_LENGTH - number.length < 1) {
      alert(ALERT_MESSAGE.MAX_NUMBER);
      return number;
    }
    return (number += $digit.textContent);
  };

  const onClickDigit = ($digit) => {
    if (!this.state.operator) {
      this.state.firstNumber = getDigitNumber(this.state.firstNumber, $digit);
    } else {
      this.state.secondNumber = getDigitNumber(this.state.secondNumber, $digit);
    }

    this.state.total = this.state.firstNumber + this.state.operator + this.state.secondNumber;
    render();
  };

  const onClickOperator = (operator) => {
    if (operator === OPERATION.EQUAL) {
      calculate();
    } else {
      this.state.operator = operator;
      this.state.total = this.state.firstNumber + operator + this.state.secondNumber;
    }

    render();
  };

  const initEventListeners = () => {
    $('.digits').addEventListener('click', (e) => {
      const $digit = e.target.closest('button');
      if (!$digit) return;

      onClickDigit($digit);
    });

    $('.operations').addEventListener('click', (e) => {
      const $operation = e.target.closest('button');
      const operator = $operation.textContent;
      if (!$operation) return;
      if (!this.state.firstNumber) {
        alert(ALERT_MESSAGE.NONE);
        return;
      }

      onClickOperator(operator);
    });

    $('.modifier').addEventListener('click', () => {
      resetState();
      render();
    });
  };
}

const app = new App();
app.init();

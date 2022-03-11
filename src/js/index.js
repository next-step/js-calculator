import { ALERT_MESSAGE, OPERATION, DIGIT_NUMBER_MEX_LENGTH } from './constants.js';
import { $ } from './utils.js';

function App() {
  // 상태값 정의
  this.state = {
    total: '0',
    firstNumber: '',
    secondNumber: '',
    operator: '',
  };

  // init 함수
  this.init = () => {
    initEventListeners();
  };

  // 렌더 함수
  const render = () => {
    $('#total').textContent = this.state.total;
  };

  // 계산식 정의
  const operations = {
    [OPERATION.PLUS]: (a, b) => Number(a) + Number(b),
    [OPERATION.MINUS]: (a, b) => Number(a) - Number(b),
    [OPERATION.MULTIPLICATION]: (a, b) => Number(a) * Number(b),
    [OPERATION.DIVISION]: (a, b) => Number(a) / Number(b),
  };

  // 상태값 초기화 함수
  const resetState = () => {
    this.state.total = '0';
    this.state.firstNumber = '';
    this.state.secondNumber = '';
    this.state.operator = '';
  };

  // 계산하는 함수
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

  // digit값 가져오는 함수
  const getDigitNumber = (number, $digit) => {
    if (DIGIT_NUMBER_MEX_LENGTH - number.length < 1) {
      alert(ALERT_MESSAGE.MAX_NUMBER);
      return number;
    }
    return (number += $digit.textContent);
  };

  // digit 클릭 함수
  const onClickDigit = ($digit) => {
    if (!this.state.operator) {
      this.state.firstNumber = getDigitNumber(this.state.firstNumber, $digit);
    } else {
      this.state.secondNumber = getDigitNumber(this.state.secondNumber, $digit);
    }

    this.state.total = this.state.firstNumber + this.state.operator + this.state.secondNumber;
    render();
  };

  // operation 클릭 함수
  const onClickOperation = (operator) => {
    if (operator === OPERATION.EQUAL) {
      calculate();
    } else {
      this.state.operator = operator;
      this.state.total = this.state.firstNumber + operator + this.state.secondNumber;
    }

    render();
  };

  // 이벤트 핸들러 모음
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

      onClickOperation(operator);
    });

    $('.modifier').addEventListener('click', () => {
      resetState();
      render();
    });
  };
}

const app = new App();
app.init();

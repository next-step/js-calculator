import { ALERT_MESSAGE, OPERATION, DIGIT_NUMBER_MEX_LENGTH } from './constants.js';
import { $ } from './utils.js';

function App() {
  // 상태값 정의
  this.state = {
    total: '0',
    digits: [],
    calculateStep: 0,
    operators: [],
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
    this.state.digits = [];
    this.state.calculateStep = 0;
    this.state.operators = [];
  };

  // 계산하는 함수
  const calculate = () => {
    // digit이 1개만 입력됐을경우
    if (!this.state.digits[1]) {
      this.state.operators[0] = '';
      this.state.total = Math.floor(this.state.digits[0]);
      render();
      return;
    }

    const total = this.state.digits.reduce((prev, current, index) => {
      if (prev !== 0 && this.state.operators[index - 1]) {
        return operations[this.state.operators[index - 1]](prev, current);
      }

      return prev + Number(current);
    }, 0);

    resetState();
    this.state.digits[0] = total + '';
    this.state.total = Math.floor(total);
    render();
  };

  // digit값 가져오는 함수
  const getDigitNumber = (number, $digit) => {
    if (!number) return $digit.textContent;
    if (DIGIT_NUMBER_MEX_LENGTH - number.length < 1) {
      alert(ALERT_MESSAGE.MAX_NUMBER);
      return number;
    }
    return (number += $digit.textContent);
  };

  // digit 클릭 함수
  const onClickDigit = ($digit) => {
    if (this.state.operators[this.state.calculateStep]) {
      this.state.calculateStep++;
    }

    this.state.digits[this.state.calculateStep] = getDigitNumber(this.state.digits[this.state.calculateStep], $digit);

    const total = this.state.digits.reduce((prev, current, index) => {
      if (this.state.operators[index]) {
        return prev + current + this.state.operators[index];
      }
      return prev + current;
    }, '');
    this.state.total = total;
    render();
  };

  // operation 클릭 함수
  const onClickOperation = (operator) => {
    if (operator === OPERATION.EQUAL || operator === OPERATION.MULTIPLICATION || operator === OPERATION.DIVISION) {
      calculate();
    }

    if (operator !== OPERATION.EQUAL) {
      this.state.operators[this.state.calculateStep] = operator;
      this.state.total = this.state.digits.reduce((prev, current, index) => prev + current + this.state.operators[index], '');
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
      if (!this.state.digits[0]) {
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

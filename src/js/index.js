import { ALERT_MESSAGE, OPERATION, DIGIT_NUMBER_MEX_LENGTH } from './constants.js';
import { getSelector, addEvent } from './utils.js';
import { getTotal, addDigitNumber, getTotalWithOperation, addOperation, getCalculateStep } from './domains.js';

const initState = {
  total: '0',
  digits: [],
  calculateStep: 0,
  operators: [],
};

function App() {
  // 상태값 정의
  this.state = initState;

  // 상태값 설정 함수
  const setState = (newState) => {
    this.state = { ...this.state, ...newState };
    render();
  };

  // 변수
  const totalEl = getSelector('#total');
  const modifierEl = getSelector('.modifier');

  // init 함수
  this.init = () => {
    initEventListeners();
  };

  // 렌더 함수
  const render = () => {
    totalEl.textContent = this.state.total;
  };

  // 상태값 초기화 함수
  const resetState = () => {
    this.state = initState;
  };

  // 계산하는 함수
  const calculate = () => {
    // digit이 1개만 입력됐을경우
    if (!this.state.digits[1]) {
      setState({
        operators: [],
        total: this.state.digits[0],
      });
      return;
    }

    const total = getTotal(this.state.digits, this.state.operators);

    resetState();
    setState({
      digits: [total],
      total,
      operators: [],
    });
  };

  // digit 클릭 함수
  const handleClickDigit = ({ textContent: digitValue }) => {
    const calculateStep = getCalculateStep(this.state.operators, this.state.calculateStep);
    if (DIGIT_NUMBER_MEX_LENGTH - this.state.digits[calculateStep]?.length < 1) {
      alert(ALERT_MESSAGE.MAX_NUMBER);
      return;
    }
    const digits = addDigitNumber(this.state.digits, calculateStep, digitValue);
    const total = getTotalWithOperation(digits, this.state.operators);
    setState({
      calculateStep,
      total,
      digits,
    });
  };

  // operation 클릭 함수
  const handleClickOperation = ({ textContent: operatorValue }) => {
    if (!this.state.digits[0]) {
      alert(ALERT_MESSAGE.NONE);
      return;
    }

    if ([OPERATION.EQUAL, OPERATION.MULTIPLICATION, OPERATION.DIVISION].includes(operatorValue)) {
      calculate();
    }

    if (operatorValue !== OPERATION.EQUAL) {
      const calculateStep = getCalculateStep(this.state.operators, this.state.calculateStep);
      const operators = addOperation(this.state.operators, calculateStep, operatorValue);
      const total = getTotalWithOperation(this.state.digits, operators);
      setState({
        calculateStep,
        operators,
        total,
      });
    }
  };

  // 이벤트 핸들러 모음
  const initEventListeners = () => {
    addEvent('click', '.digits button', handleClickDigit);
    addEvent('click', '.operations button', handleClickOperation);

    modifierEl.addEventListener('click', () => {
      resetState();
      render();
    });
  };
}

const app = new App();
app.init();

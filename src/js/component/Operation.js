import { calculate } from '../utils/calculation.js';

export class Operation {
  constructor(elements, display, state) {
    this.elements = elements;
    this.display = display;
    this.state = state;

    this.operate = this.operate.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
  init() {
    [].forEach.call(this.elements, ele => {
      ele.addEventListener('click', eve => {
        this.operate(eve.target.innerText);
      });
    });
  }
  operate(op) {
    const { state } = this;
    // 연산을 수행할 모든 값이 있는 경우만 수행
    if (
      state.operator &&
      state.currInput !== '' &&
      state.prevInput !== '' &&
      state.prevInput !== NaN
    ) {
      state.prevInput = calculate(
        Number.parseInt(state.prevInput),
        state.operator,
        Number.parseInt(state.currInput)
      );
      // 연산 수행 후 초기화
      state.currInput = '';
      if (op === '=') state.operator = '';
    } else if (
      state.currInput !== '' &&
      state.currInput !== NaN &&
      op !== '='
    ) {
      // 연산을 수행하지 않는 경우 현재 입력값만 기존 입력값에 대입
      state.prevInput = state.currInput;
      state.currInput = '';
    }
    // 연산자가 = 이 아니라면 연산자를 캐싱
    if (op !== '=') state.operator = op;

    // 연산이 수행되서 state.operator 값이 초기화되지 않은 경우는 연산자 정보 표기
    const addInfo = state.operator ? ' ' + state.operator : '';

    // 초기에 prevInput에 값이 없거나 모든 값이 0인 경우 처리
    this.display((state.prevInput || state.currInput || '0') + addInfo);
  }
}

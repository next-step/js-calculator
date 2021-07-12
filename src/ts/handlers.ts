import { Operator, Sign, MAX_RESULT_LEN, INITIAL_RESULT } from './constants.js';

/**
 * State
 */
let lOperland = '',
  rOperland = '',
  operator: Operator | null = null,
  lSign: Sign = Sign.Plus,
  rSign: Sign = Sign.Plus;

/**
 * 숫자 클릭 핸들러
 */
export const digitClickHandler = {
  isAcceptable() {
    const operland = operator ? rOperland : lOperland;
    return operland.length < MAX_RESULT_LEN;
  },

  handle(target: HTMLElement, $result: HTMLElement) {
    // 3자리 다 입력했는지 체크
    if (!this.isAcceptable()) return;

    if (!target.textContent) return;

    const { textContent: digit } = target;
    const nextContext = operator ? (rOperland += digit) : (lOperland += digit);

    $result.textContent = nextContext;
  },
};

/**
 * operation(+,-,X,/,=) 클릭 핸들러
 */
export const operationClickHandler = {
  $result: {} as HTMLElement,

  handleClickEq() {
    const lValue = lSign * +lOperland;
    const rValue = rSign * +rOperland;
    let result;

    if (operator === Operator.Add) result = lValue + rValue;
    else if (operator === Operator.Sub) result = lValue - rValue;
    else if (operator === Operator.Mult) result = lValue * rValue;
    else if (operator === Operator.Div) result = lValue / rValue;
    else return;

    // 소수점 버림
    this.$result.textContent = `${Math.floor(result)}`;
  },

  shouldAcceptLOperand() {
    return !lOperland;
  },

  shouldAcceptROperland() {
    return operator && !rOperland;
  },

  handle(target: HTMLElement, $result: HTMLElement) {
    this.$result = $result;

    // 계산결과 확인
    if (target.textContent === Operator.Eq) {
      return this.handleClickEq();
    }

    // 음수 입력
    if (target.textContent === Operator.Sub) {
      if (this.shouldAcceptLOperand()) return (lSign *= Sign.Minus);
      if (this.shouldAcceptROperland()) return (rSign *= Sign.Minus);
    }

    // 그 외의 경우, 연산자 입력
    operator = target.textContent! as Operator;
  },
};

/**
 * modifier(AC) 클릭 핸들러
 */
export const modifierClickHandler = {
  resetOperland() {
    lOperland = '';
    rOperland = '';
  },

  resetOperator() {
    operator = null;
  },

  resetSign() {
    lSign = Sign.Plus;
    rSign = Sign.Plus;
  },

  resetResult($result: HTMLElement) {
    $result.textContent = INITIAL_RESULT;
  },

  handle($result: HTMLElement) {
    this.resetOperland();
    this.resetOperator();
    this.resetSign();
    this.resetResult($result);
  },
};

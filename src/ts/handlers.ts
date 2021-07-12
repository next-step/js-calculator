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

    if (target.textContent === Operator.Eq) {
      return this.handleClickEq();
    }

    if (target.textContent === Operator.Sub) {
      if (this.shouldAcceptLOperand()) return (lSign *= Sign.Minus);
      if (this.shouldAcceptROperland()) return (rSign *= Sign.Minus);
    }

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

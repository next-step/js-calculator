import { ButtonClass, Selector, Operator, Sign, MAX_RESULT_LEN, INITIAL_RESULT } from './constants.js';
import { $ } from './util.js';

/** DOM */
const $calculator = $(Selector.Calculator)!;
const $result = $(Selector.Result, $calculator)!;

/** State */
let lOperland = '',
  rOperland = '',
  operator: Operator | null = null,
  lSign: Sign = Sign.Plus,
  rSign: Sign = Sign.Plus;

/** 숫자 클릭 핸들러 */
const digitClickHandler = {
  isAcceptable() {
    const operland = operator ? rOperland : lOperland;
    return operland.length < MAX_RESULT_LEN;
  },

  handle(target: HTMLElement) {
    if (!this.isAcceptable()) return;
    if (!target.textContent) return;

    const { textContent: digit } = target;
    const nextContext = operator ? (rOperland += digit) : (lOperland += digit);

    $result.textContent = nextContext;
  },
};

/** operation(+,-,X,/,=) 클릭 핸들러 */
const operationClickHandler = {
  handleClickEq() {
    const lValue = lSign * +lOperland;
    const rValue = rSign * +rOperland;
    let result;

    if (operator === Operator.Add) result = lValue + rValue;
    else if (operator === Operator.Sub) result = lValue - rValue;
    else if (operator === Operator.Mult) result = lValue * rValue;
    else if (operator === Operator.Div) result = lValue / rValue;
    else return;

    $result.textContent = `${Math.floor(result)}`;
  },

  shouldAcceptLOperand() {
    return !lOperland;
  },

  shouldAcceptROperland() {
    return operator && !rOperland;
  },

  handle(target: HTMLElement) {
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

/** modifier(AC) 클릭 핸들러 */
const modifierClickHandler = {
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

  resetResult() {
    $result.textContent = INITIAL_RESULT;
  },

  handle() {
    this.resetOperland();
    this.resetOperator();
    this.resetSign();
    this.resetResult();
  },
};

/** 클릭 이벤트 리스너 */
function handleClickButton(evt: MouseEvent) {
  const target = evt?.target as HTMLElement;
  const classList = target?.classList;

  if (!classList) return;

  if (classList.contains(ButtonClass.Digit)) digitClickHandler.handle(target);
  else if (classList.contains(ButtonClass.Operation)) operationClickHandler.handle(target);
  else if (classList.contains(ButtonClass.Modifier)) modifierClickHandler.handle();
}

$calculator.addEventListener('click', handleClickButton);

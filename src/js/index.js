import { MAX_RESULT_LEN, INITIAL_RESULT } from './constants.js';
import { $ } from './util.js';
/** DOM */
const $calculator = $(".calculator" /* Calculator */);
const $result = $("#total" /* Result */, $calculator);
/** State */
let lOperland = '', rOperland = '', operator = null, lSign = 1 /* Plus */, rSign = 1 /* Plus */;
/** 숫자 클릭 핸들러 */
const digitClickHandler = {
    isAcceptable() {
        const operland = operator ? rOperland : lOperland;
        return operland.length < MAX_RESULT_LEN;
    },
    handle(target) {
        if (!this.isAcceptable())
            return;
        if (!target.textContent)
            return;
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
        if (operator === "+" /* Add */)
            result = lValue + rValue;
        else if (operator === "-" /* Sub */)
            result = lValue - rValue;
        else if (operator === "X" /* Mult */)
            result = lValue * rValue;
        else if (operator === "/" /* Div */)
            result = lValue / rValue;
        else
            return;
        $result.textContent = `${Math.floor(result)}`;
    },
    shouldAcceptLOperand() {
        return !lOperland;
    },
    shouldAcceptROperland() {
        return operator && !rOperland;
    },
    handle(target) {
        if (target.textContent === "=" /* Eq */) {
            return this.handleClickEq();
        }
        if (target.textContent === "-" /* Sub */) {
            if (this.shouldAcceptLOperand())
                return (lSign *= -1 /* Minus */);
            if (this.shouldAcceptROperland())
                return (rSign *= -1 /* Minus */);
        }
        operator = target.textContent;
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
        lSign = 1 /* Plus */;
        rSign = 1 /* Plus */;
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
function handleClickButton(evt) {
    const target = evt?.target;
    const classList = target?.classList;
    if (!classList)
        return;
    if (classList.contains("digit" /* Digit */))
        digitClickHandler.handle(target);
    else if (classList.contains("operation" /* Operation */))
        operationClickHandler.handle(target);
    else if (classList.contains("modifier" /* Modifier */))
        modifierClickHandler.handle();
}
$calculator.addEventListener('click', handleClickButton);
//# sourceMappingURL=index.js.map
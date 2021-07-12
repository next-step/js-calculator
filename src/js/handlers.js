import { MAX_RESULT_LEN, INITIAL_RESULT } from './constants.js';
/**
 * State
 */
let lOperland = '', rOperland = '', operator = null, lSign = 1 /* Plus */, rSign = 1 /* Plus */;
/**
 * 숫자 클릭 핸들러
 */
export const digitClickHandler = {
    isAcceptable() {
        const operland = operator ? rOperland : lOperland;
        return operland.length < MAX_RESULT_LEN;
    },
    handle(target, $result) {
        if (!this.isAcceptable())
            return;
        if (!target.textContent)
            return;
        const { textContent: digit } = target;
        const nextContext = operator ? (rOperland += digit) : (lOperland += digit);
        $result.textContent = nextContext;
    },
};
/**
 * operation(+,-,X,/,=) 클릭 핸들러
 */
export const operationClickHandler = {
    $result: {},
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
        this.$result.textContent = `${Math.floor(result)}`;
    },
    shouldAcceptLOperand() {
        return !lOperland;
    },
    shouldAcceptROperland() {
        return operator && !rOperland;
    },
    handle(target, $result) {
        this.$result = $result;
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
        lSign = 1 /* Plus */;
        rSign = 1 /* Plus */;
    },
    resetResult($result) {
        $result.textContent = INITIAL_RESULT;
    },
    handle($result) {
        this.resetOperland();
        this.resetOperator();
        this.resetSign();
        this.resetResult($result);
    },
};

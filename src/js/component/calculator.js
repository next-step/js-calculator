import {
    DIGIT_MAX_LENGTH,
    INIT_DIGIT,
    MESSAGE,
    EQUAL,
    SELECTORS,
    CALCULATOR,
} from "../constant/index.js";
import { $ } from "../util/index.js";

export default class Calculator {
    constructor() {
        this.prevDigit = this.nextDigit = INIT_DIGIT;
        this.operation = "";

        this.$total = $(SELECTORS.ID.TOTAL);
        this.$calculator = $(SELECTORS.CLASS.CALCULATOR);

        this.$calculator.addEventListener("click", (event) => this.onClick(event));
    }

    onClick(event) {
        if (event.target.classList.contains(SELECTORS.CLASS.DIGIT.substring(1))) {
            this.onClickDigit(event.target.closest(SELECTORS.CLASS.DIGIT).innerHTML);
        } else if (event.target.classList.contains(SELECTORS.CLASS.OPERATION.substring(1))) {
            this.onClickOperation(event.target.closest(SELECTORS.CLASS.OPERATION).innerHTML);
        } else if (event.target.classList.contains(SELECTORS.CLASS.MODIFIER.substring(1))) {
            this.onClickModifier();
        }
    }

    onClickDigit(digit) {
        let total = this.getTotal();

        if (this.operation === "") {
            if (this.checkDigitMaxLength(this.prevDigit)) {
                alert(MESSAGE.ERROR.DIGIT_OVER);
                return;
            }

            total = this.prevDigit = this.prevDigit === INIT_DIGIT ? digit : this.prevDigit + digit;

            this.setTotal(total);
            return;
        }

        if (this.checkDigitMaxLength(this.nextDigit)) {
            alert(MESSAGE.ERROR.DIGIT_OVER);
            return;
        }

        this.nextDigit = this.nextDigit === INIT_DIGIT ? digit : this.nextDigit + digit;
        total = this.prevDigit + this.operation + this.nextDigit;

        this.setTotal(total);
    }

    checkDigitMaxLength(digit) {
        return digit.length >= DIGIT_MAX_LENGTH;
    }

    onClickOperation(operation) {
        if (operation === EQUAL) {
            this.onCalculation();
        } else if (this.operation !== "") {
            if (this.nextDigit === INIT_DIGIT) {
                alert(MESSAGE.ERROR.OPERATOR_EXIST);
                return;
            }

            this.onCalculation();
            this.operation = operation;

            this.setTotal(this.getTotal() + operation);
        } else {
            this.operation = operation;

            this.setTotal(this.prevDigit + operation);
        }
    }

    onClickModifier() {
        this.prevDigit = this.nextDigit = INIT_DIGIT;
        this.operation = "";

        this.setTotal(INIT_DIGIT);
    }

    onCalculation() {
        const operation = this.operation;
        const result = CALCULATOR[operation](+this.prevDigit, +this.nextDigit);

        this.prevDigit = result.toString();
        this.nextDigit = INIT_DIGIT;
        this.operation = "";

        this.setTotal(result);
    }

    getTotal() {
        return this.$total.innerHTML;
    }

    setTotal(event) {
        this.$total.innerHTML = event;
    }
}

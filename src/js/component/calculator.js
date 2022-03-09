import { DIGIT_MAX_LENGTH, INIT_DIGIT, MESSAGE, PLUS, MINUS, DIVISION, MULTIPLICATION, EQUAL, OPERATORS, SELECTORS, CALCULATOR } from "../constant/index.js";
import { $ } from "../util/index.js";

export default class Calculator {
    constructor() {
        this.isFirstCalc = true;

        this.$total = $(SELECTORS.ID.TOTAL);
        this.$calculator = $(SELECTORS.CLASS.CALCULATOR);

        
        console.log(SELECTORS.CLASS);

        this.$calculator.addEventListener("click", (event) => this.onClick(event));
    }

    onClick(event) {
        if(event.target.classList.contains(SELECTORS.CLASS.DIGIT.substring(1))) {
            this.onClickDigit(event.target.closest(SELECTORS.CLASS.DIGIT).innerHTML);
        } else if(event.target.classList.contains(SELECTORS.CLASS.OPERATION.substring(1))) {
            this.onClickOperation(event.target.closest(SELECTORS.CLASS.OPERATION).innerHTML);
        } else if(event.target.classList.contains(SELECTORS.CLASS.MODIFIER.substring(1))) {
           this.onClickModifier();
        } 
    }

    onClickDigit(digit) {        
        const total = this.getTotal() + digit;

        if(!this.isFirstCalc && !this.checkDigitMaxLength(total)) {
            alert(MESSAGE.ERROR.DIGIT_OVER);
            return;
        }

        if(this.getTotal() === INIT_DIGIT) {
            this.setTotal(digit);
        } else {
            this.setTotal(this.getTotal() + digit);
        }
    }

    checkDigitMaxLength(total) {
        return total.split(this.getOperation()).filter(digit => digit.length > DIGIT_MAX_LENGTH).length === 0;
    }

    checkExistOperation() {
        return this.getTotal().split("").filter(v => isNaN(parseInt(v))).length > 0;
    }

    getDigits() {
        return this.getTotal().split(this.getOperation());
    }

    getOperation() {
        return this.getTotal().split("").find(v => OPERATORS.includes(v));
    }

    onClickOperation(operation) {
        if(operation === EQUAL) {
            this.onCalculation();
        } else if(this.checkExistOperation()) {
            alert(MESSAGE.ERROR.EXIST_OPERATION);
        } else {
            this.setTotal(this.getTotal() + operation);     
        }       
    }

    onClickModifier() {
        this.setTotal(INIT_DIGIT);
    }

    onCalculation() {
        const operation = this.getOperation();
        const digits = this.getDigits();

        this.setTotal(CALCULATOR[operation](+digits[0], +digits[1]));
        this.isFirstCalc = false;
    }

    getTotal() {
        return this.$total.innerHTML;
    }

    setTotal(event) {
        this.$total.innerHTML = event;
    }
}

import { SELECTORS } from "../constance/element.js";
import { MESSAGE } from "../constance/message.js";
import { $, getInteger } from "../util/index.js";

export default class Calculator {
    constructor() {
        this.frontNumber = "0";
        this.backNumber = "0";
        this.operation = "";

        this.$total = $(SELECTORS.ID.TOTAL);
        this.$digits = $(SELECTORS.CLASS.DIGITS);
        this.$operations = $(SELECTORS.CLASS.OPERATIONS);
        this.$modifiers = $(SELECTORS.CLASS.MODIFIERS);

        this.$digits.addEventListener("click", (event) => this.onClickDigit(event.target.closest(SELECTORS.CLASS.DIGIT).innerHTML));
        this.$operations.addEventListener("click", (event) => this.onClickOperation(event.target.closest(SELECTORS.CLASS.OPERATION).innerHTML));
        this.$modifiers.addEventListener("click", () => this.onClickModifier());
    }

    onClickDigit(digit) {        
        if(this.operation) {
            if(this.backNumber.length < 3) {
                this.backNumber += digit;
            } else {
                alert(MESSAGE.ERROR.DIGIT_OVER);
            }      
        } else {
            if(this.frontNumber === "0") {
                this.frontNumber = digit;
            } else {
                if(this.frontNumber.length < 3) {
                    this.frontNumber += digit;
                } else {
                    alert(MESSAGE.ERROR.DIGIT_OVER);
                }                
            }
        }

        if(this.operation === "" && this.frontNumber === "0") {
            this.setTotal(digit);
        } else {
            this.setTotal(this.getTotal()+digit);
        }   
    }

    onClickOperation(operation) {
        if(operation !== "=") {
            this.operation = operation;
        }

        if(operation === "=") {
            this.onCalculation();
        } else {
            this.setTotal(this.getTotal() + operation);
        }       
    }

    onClickModifier() {
        this.setTotal(0);

        this.frontNumber = "";
        this.operation = "";
        this.backNumber = "";
    }

    onCalculation() {
        if(this.operation === "+") {
            this.setTotal(`${getInteger(this.frontNumber) + getInteger(this.backNumber)}`);
        } else if(this.operation === "-") {
            this.setTotal(`${getInteger(this.frontNumber) - getInteger(this.backNumber)}`);
        } else if(this.operation === "X") {
            this.setTotal(`${getInteger(this.frontNumber) * getInteger(this.backNumber)}`);
        } else if(this.operation === "/") {
            this.setTotal(`${Math.floor(getInteger(this.frontNumber) / getInteger(this.backNumber))}`);
        }

        this.frontNumber = this.getTotal();
        this.operation = "";
        this.backNumber = "";
    }

    getTotal() {
        return this.$total.innerHTML;
    }

    setTotal(event) {
        this.$total.innerHTML = event;
    }
}

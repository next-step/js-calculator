const calculatorAlertMessage = {
    maxOperand: '숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.',
    maxOperandCount: '2개의 피연산자에 대한 연산만 가능합니다'
}

export default class Calculator {
    constructor() {
        this.firstOperand = [];
        this.secondOperand = [];
        this.operator = null;
    }

    insertOperand(target) {
        const maxFirstOperand = this.firstOperand.length > 2
        const maxSecondOperand = this.secondOperand.length > 2

        if (this.operator === null) {
            if (maxFirstOperand) {

                return alert(calculatorAlertMessage.maxOperand);
            }
            this.firstOperand.push(target);
        } else {
            if (maxSecondOperand) {
                return alert(calculatorAlertMessage.maxOperand);
            }
            this.secondOperand.push(target);
        }
    }

    insertOperator(target) {
        if (this.operator === null || this.secondOperand.length === 0) {
            this.operator = target
        } else {
            alert(calculatorAlertMessage.maxOperandCount)
        }
    }

    getDisplayText() {
        return this.firstOperand.concat(this.operator, this.secondOperand).join('');
    }

    resetCalculator() {
        this.firstOperand = [];
        this.secondOperand = [];
        this.operator = null;
    }

    calculate() {
        const first = (Number(this.firstOperand.join('')));
        const second = (Number(this.secondOperand.join('')));
        const operator = this.operator === 'X' ? '*' : this.operator;
        const result = new Function(`return ${first}${operator}${second}`)();

        return Math.floor(result)
    }
}


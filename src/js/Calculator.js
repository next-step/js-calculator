export const Operator = Object.freeze({
    plus: '+',
    minus: '-',
    multiply: 'X',
    divide: '/',
    equalSign: '='
});

export const MAX_NUMBER = 999;


export class Calculator {
    constructor() {
        this.currValue = 0;
        this.prevValue = null;
        this.operator = null;
        this.total = document.querySelector('#total');

        const digits = document.querySelector('.digits');
        const modifiers = document.querySelector('.modifiers');
        const operations = document.querySelector('.operations');

        digits.addEventListener('click', this.handleDigitClick.bind(this));
        modifiers.addEventListener('click', this.handleModifierClick.bind(this));
        operations.addEventListener('click', this.handleOperationClick.bind(this));
    }

    setState({ prevValue, currValue, operator }) {
        this.prevValue = prevValue ?? this.prevValue;
        this.currValue = currValue ?? this.currValue;
        this.operator = operator ?? this.operator;
    }

    setTotal(callback) {
        console.log(callback(this.total.textContent));
        this.total.textContent = callback(this.total.textContent);
    }

    handleDigitClick(event) {
        const digit = Number(event.target.textContent);
        const nextValue = (this.currValue * 10) + digit;

        // 최대 3자리 수까지 입력
        if (nextValue > MAX_NUMBER) return;

        this.setState({ currValue: nextValue });
        this.setTotal((totalText) => (totalText === '0'? '' : totalText) + digit);
    }

    handleModifierClick() {
        this.setState({ prevValue: null, currValue: 0 });
        this.setTotal(() => 0);
    }

    handleOperationClick(event) {
        const operator = event.target.textContent;

        if (operator === Operator.equalSign) {
            return this.handleEqualSignClick();
        }

        if (!this.prevValue && this.currValue === 0) return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
        this.setState({ prevValue: this.currValue, currValue: 0, operator });
        this.setTotal((totalText) => totalText + operator);
    }

    handleEqualSignClick() {
        if (this.prevValue && this.operator) {
            const result = this.calculate(this.operator, this.prevValue, this.currValue);
            this.setState({ prevValue: null, currValue: result });
            this.setTotal(() => result);
        }
    }

    calculate(operator, prevValue, currValue) {
        switch(operator) {
            case Operator.plus:
                return prevValue + currValue;
            case Operator.minus:
                return prevValue - currValue;
            case Operator.multiply:
                return prevValue * currValue;
            case Operator.divide:
                return Math.floor(prevValue / currValue);
            default:
                throw new Error('invalid operator');
        }
    }
}
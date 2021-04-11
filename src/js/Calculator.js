export class Calculator {
    constructor() {
        this.currValue = 0;
        this.prevValue = null;
        this.operator = null;
        this.total = document.querySelector('#total');

        const digits = document.querySelector('.digits');
        const modifiers = document.querySelector('.modifiers');
        const operations = document.querySelector('.operations');

        digits.addEventListener('click', (event) => {
            const digit = Number(event.target.textContent);
            this.updateTotal(digit);
        });

        modifiers.addEventListener('click', () => {
            
            this.clear();
        });

        operations.addEventListener('click', (event) => {
            const operator = event.target.textContent;

            if (operator === '=') {
                console.log(this.prevValue, this.operator);
                if (this.prevValue && this.operator) {
                    const result = this.calculate(this.operator, this.prevValue, this.currValue);
                    this.total.textContent = result;
                    this.prevValue = null;
                    this.currValue = result
                    return;
                }
            }

            if (!this.prevValue && this.currValue === 0) return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
            this.operator = operator;
            this.total.textContent += event.target.textContent;
            this.prevValue = this.currValue;
            this.currValue = 0;
        });
    }

    updateTotal(digit) {
        // 최대 3자리 수까지 입력
        if (this.currValue > 99) return;
        this.currValue = (this.currValue * 10) + digit;

        if (this.total.textContent == '0') this.total.textContent = digit;
        else this.total.textContent += digit;
    }

    clear() {
        this.currValue = 0;
        this.prevValue = null;
        this.total.textContent = this.currValue;
    }

    calculate(operator, prevValue, currValue) {
        switch(operator) {
            case '+':
                return prevValue + currValue;
            case '-':
                return prevValue - currValue;
            case 'X':
                return prevValue * currValue;
            case '/':
                return Math.floor(prevValue / currValue);
            default:
                throw new Error('invalid operator');
        }
    }
}
export class Calculator {
    constructor(total) {
        this.prevDigit = 0;
        this.result = [];
        this.resultSign = '=';
        this.total = total;
        this.operation = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'X': (a, b) => a * b,
            '/': (a, b) => Math.floor(a / b),
        };
        this.operatorType = Object.keys(this.operation);
    }

    reset() {
        this.changeResult(0);
        this.prevDigit = 0;
        this.result = [];
    }

    insertDigit(e) {
        if (!this.prevDigit) this.changeResult(0);
        if (this.prevDigit.toString().length > 2) return alert('숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.');

        this.changeResult(Number(this.total.innerText + e.target.innerText))
        this.prevDigit = this.total.innerText;
    }

    insertOperator(e) {
        this.result.push(+this.prevDigit);
        if (e.target.innerText === this.resultSign) return this.calculate();
        // 바로 직전 입력값이 연산자라면 해당 연산자를 제거하고 현재 입력한 연산자로 교체함
        if (this.operatorType.includes(this.result[this.result.length - 1])) this.result.pop();
        this.result.push(e.target.innerText);
        this.prevDigit = 0;
    }

    calculate() {
        if (!this.validateOperator()) return alert('연산을 입력해주세요.');
        this.prevDigit = this.changeResult(this.operate());
        this.result = [];
    }

    validateOperator = () => {
        return this.result.some(row => this.operatorType.includes(row));
    }

    operate = () => {
        let value = this.result.shift();
        while (this.result.length > 0) {
            let operator = this.result.shift();
            let digit = this.result.shift();

            value = this.operation?.[operator](value, digit);
        }

        return value;
    }

    changeResult(value) {
        this.total.innerText = value;
        return value;
    }
}
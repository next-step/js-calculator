export class Calculator {
    constructor({ total, modifiers, operations, digits }) {
        this.prevDigit = 0;
        this.result = [];
        this.operatorType = ['+', '-', 'X', '/'];
        this.resultSign = '=';
        this.total = total;
        this.modifiers = modifiers;
        this.operations = operations;
        this.digits = digits;
        this.setEventListeners();

        this.operation = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'X': (a, b) => a * b,
            '/': (a, b) => Math.floor(a / b),
        };
    }

    setEventListeners() {
        this.modifiers.addEventListener('click', () => this.reset());
        this.digits.addEventListener('click', e => this.insertDigit(e));
        this.operations.addEventListener('click', e => this.insertOperator(e));
    }

    reset() {
        this.changeResult(0);
        this.prevDigit = 0;
        this.result = [];
    }

    insertDigit(e) {
        if (!this.prevDigit) this.total.innerText = 0;
        if (this.prevDigit.toString().length > 2) return alert('숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.');

        this.changeResult(Number(this.total.innerText+ e.target.innerText))
        this.prevDigit = this.total.innerText;
    }

    insertOperator(e) {
        this.result.push(+this.prevDigit);

        // 바로 직전 입력값이 연산자라면 해당 연산자를 제거하고 현재 입력한 연산자로 교체함
        if (this.operatorType.includes(this.result[this.result.length - 1])) this.result.pop();
        if (e.target.innerText === this.resultSign) return this.calculate();
        this.result.push(e.target.innerText);
        this.prevDigit = 0;
    }

    calculate() {
        this.validateOperator();
        this.validateDigit();
        this.prevDigit = this.changeResult(this.operate());
        this.result = [];
    }

    validateOperator() {
        if (!this.result.some(row => this.operatorType.includes(row))) return alert('연산을 입력해주세요.');
    }

    validateDigit() {
        if (this.result.filter(row => !this.operatorType.includes(row)).length < 2) return alert('비교 대상 값을 입력해주세요.');
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
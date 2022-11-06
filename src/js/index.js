const total = document.querySelector('#total');
const modifiers = document.querySelector('.modifiers');
const operations = document.querySelector('.operations');
const digits = document.querySelector('.digits');
let prevDigit = 0;
let result = [];
const operator = ['+', '-', 'X', '/'];

function calculators() {
    modifiers.addEventListener('click', reset);
    digits.addEventListener('click', insertDigit);
    operations.addEventListener('click', insertOperator);
}

function reset() {
    total.innerText = 0;
    prevDigit = 0;
    result = [];
}

// 숫자 입력
function insertDigit(e) {
    if (!prevDigit) total.innerText = 0;
    if (prevDigit.toString().length > 2) return alert('숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.');

    total.innerText = Number(total.innerText) === 0 ? e.target.innerText : total.innerText + e.target.innerText;
    prevDigit = total.innerText;
}

// 연산자 입력
function insertOperator(e) {
    result.push(prevDigit);

    // 바로 직전 입력값이 연산자라면 해당 연산자를 제거하고 현재 입력한 연산자로 교체함
    if (operator.includes(result[result.length - 1])) result.pop();

    result.push(e.target.innerText);

    if (e.target.innerText === '=') return calculate();
    prevDigit = 0;
}

// 계산
function calculate() {
    if (!result.filter(row => operator.includes(row)).length) return alert('연산을 입력해주세요.');
    if (result.filter(row => !operator.includes(row)).length < 2) return alert('비교 대상 값을 입력해주세요.');

    const operators = result.filter(row => row !== '=').filter(row => operator.includes(row));
    const digit = result.filter(row => row !== '=').filter(row => !operator.includes(row)).map(row => Number(row));
    let value = digit[0];

    digit.forEach((r, i) => {
        if (i === digit.length - 1) return;
        if (i !== 0 && i % 2 === 0) return;

        switch (operators[i]) {
            case '+':
                value += digit[i + 1];
                break;
            case '-':
                value -= digit[i + 1];
                break;
            case 'X':
                value *= digit[i + 1];
                break;
            case '/':
                value /= digit[i + 1];
                break;
        }
    });

    total.innerText = prevDigit = Math.floor(value);
    result = [];
}

window.onload = () => calculators();
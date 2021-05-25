const $total = document.getElementById('total');
const $digits = document.querySelector('.digits');
const $operators = document.querySelector('.operations');
const $AC = document.querySelector('.modifier');

let numbers = [];
let number = '';
let operator = '';

const OPERATORS = {
    ADD: '+',
    SUB: '-',
    MULTI: 'X',
    DIV: '/',
};

const calculation = {
    [OPERATORS.ADD]: (a, b = 0) => a + b,
    [OPERATORS.SUB]: (a, b = 0) => a - b,
    [OPERATORS.MULTI]: (a, b = 1) => a * b,
    [OPERATORS.DIV]: (a, b = 1) => a / b,
};

export const initCalulator = () => {
    $digits.addEventListener('click', onClickDigit);
    $operators.addEventListener('click', onClickOperator);
    $AC.addEventListener('click', onClickAC);
};

const onClickDigit = ({target}) => {
    if (numbers.length >= 2) {
        alert('2개의 숫자에 대한 연산만 가능합니다. ');
        return;
    }
    if (number.length >= 3) {
        alert('최대 3자리 수까지 입력 가능합니다.');
        return;
    }

    number += target.value;
    if ($total.innerText == '0') {
        $total.innerText = target.value;
        return;
    }
    $total.innerText += target.value;
};

const onClickOperator = ({target}) => {
    const text = $total.innerText;

    if (text == '0') {
        alert('숫자를 먼저 입력해주세요.');
        return;
    }

    if (target.value == '=' && operator != '') {
        numbers[1] = Number(number);

        const result = Math.floor(calculation[operator](numbers[0], numbers[1]));
        $total.innerText = result;
        numbers = [];
        number = String(result);
        operator = '';
        return;
    }

    if (numbers[0] == null) {
        numbers[0] = Number(number);
    }

    if (operator != '') {
        return;
    }
    number = '';
    operator = target.value;
    $total.innerText += target.value;
};

const onClickAC = () => {
    $total.innerText = '0';
    operator = '';
    number = '';
    numbers = [];
};

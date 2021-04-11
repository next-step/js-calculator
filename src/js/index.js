import {INITAIL_VALUE, ALERT_MSG_OVER_THREE_NUMBER, ALERT_MSG_WITH_OUT_NUMBER} from './constant.js'

const $display = document.querySelector('#total');
const $allClear = document.querySelector('.modifier');
const $operations = document.querySelector('.operations');
const $digits = document.querySelector('.digits');

let firstNumber = '';
let operation = '';
let secondNumber = '';
let result = 0;

const allClearClick = ()=>{
    firstNumber = '';
    secondNumber = '';
    operation = '';
    result = 0;
    display(true);
}

const digitClick = (event) => {
    if(operation == ''){
        if(firstNumber.toString().length >= 3) {
            alert('숫자는 세 자리까지만 입력 가능합니다!')
            return;
        }
        firstNumber = parseInt(firstNumber + event.target.innerText);
        display();
    }else{
        if(secondNumber.toString().length >= 3) {
            alert(ALERT_MSG_OVER_THREE_NUMBER)
            return;
        }
        secondNumber = parseInt(secondNumber + event.target.innerText);
        display();
    }
}

const operationClick = (event) => {
    if(firstNumber===0) {
        alert(ALERT_MSG_WITH_OUT_NUMBER);
        return;
    }
    if(event.target.innerText==='='){
        calculation(parseInt(firstNumber), parseInt(secondNumber));
        $display.innerText = result
        firstNumber = result;
        secondNumber = '';
        operation = '';
        result = INITAIL_VALUE;
        return;
    }
    operation = event.target.innerText;
    display();
}

const display = (isAC=false) => {
    $display.innerText = firstNumber+operation+secondNumber;
    if (isAC) $display.innerText = INITAIL_VALUE;
}

const calculation = (firstNumber, secondNumber) => {
    switch (operation) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case 'X':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = Math.floor(firstNumber / secondNumber);
            break;
    }
}

$allClear.addEventListener('click', allClearClick);
$digits.addEventListener('click', digitClick);
$operations.addEventListener('click', operationClick);
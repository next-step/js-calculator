const $display = document.querySelector('#total');
const $allClear = document.querySelector('.modifier');
const $operations = document.querySelector('.operations');
const $digits = document.querySelector('.digits');

let firstNumber = '';
let operation = '';
let secondNumber = '';
let result = 0;

$allClear.addEventListener('click', allClear)
$digits.addEventListener('click', digitClick);
$operations.addEventListener('click', operationClick)

function display(isAC=false){
    $display.innerText = firstNumber+operation+secondNumber;
    if (isAC) $display.innerText = '0';
}
function operationClick (event) {
    if(firstNumber===0) {
        alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
        return;
    }
    if(event.target.innerText==='='){
        console.log(secondNumber)
        calculation(parseInt(firstNumber), parseInt(secondNumber));
        $display.innerText = result
        firstNumber = result;
        secondNumber = '';
        operation = '';
        result = 0;
        return;
    }
    operation = event.target.innerText;
    display();
}
function calculation(firstNumber, secondNumber) {
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
    console.log(result)
}

function allClear(){
    firstNumber = '';
    secondNumber = '';
    operation = '';
    result = 0;
    display(true);
}

function digitClick(event) {
    if(operation == ''){
        if(firstNumber.toString().length >= 3) {
            alert('숫자는 세 자리까지만 입력 가능합니다!')
            return;
        }
        firstNumber = parseInt(firstNumber + event.target.innerText);
        display();
    }else{
        if(secondNumber.toString().length >= 3) {
            alert('숫자는 세 자리까지만 입력 가능합니다!')
            return;
        }
        secondNumber = parseInt(secondNumber + event.target.innerText);
        display();
    }
}


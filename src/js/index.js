const number = document.getElementsByClassName("digit");
const total = document.getElementById("total");
const buttons = document.querySelectorAll('button');

const ALERT_DIGIT = "숫자는 세 자리까지만 입력 가능합니다!";
const ALERT_OPERATOR = "숫자를 먼저 입력해주세요!";
const ALERT_DIGIT_MAX_LENGT = 3;

let numOne = '';
let numTwo = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        onClickButton(e.target.innerText, e.target.className);
    })
})


const onClickButton = (data, name) => { 
    if(name === 'digit'){
        onClickNumber(data)
    } else if(name === 'modifier'){
        onModify();
    } else if(name === 'operation'){
        if(data === '='){
            onClickCal();            
        } else {
            onClickOperator(data);
        }
    }
}

const onModify = () => {
    numOne = operator = numTwo = '';
    total.innerText = 0;
}

const onClickNumber = (number) => {
    if(operator){
        numTwo.length >= ALERT_DIGIT_MAX_LENGT ? alert(ALERT_DIGIT) : numTwo += number;
        total.innerText = numOne + operator + numTwo;
    } else {
        numOne.length >= ALERT_DIGIT_MAX_LENGT ? alert(ALERT_DIGIT) : numOne += number;
        total.innerText === '0' ? total.innerText = number : total.innerText = numOne;
    }
}

const onClickOperator = (op) => {
    operator = op;
    !numOne ? onAlertOperator() : total.innerText = numOne + operator;
}

const onClickCal = () => {
    if(operator === '+'){
        total.innerText = Number(numOne) + Number(numTwo);
    } else if(operator === '-'){
        total.innerText = Number(numOne) - Number(numTwo);
    } else if(operator === 'X'){
        total.innerText = Number(numOne) * Number(numTwo);
    } else if(operator === '/'){
        total.innerText = Math.floor(Number(numOne) / Number(numTwo));
    }
    numTwo = '';
    numOne = total.innerText;
    operator = '';
}

const onAlertOperator = () => {
    alert(ALERT_OPERATOR);
    operator = '';
}

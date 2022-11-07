import Calculator  from "./Calculator.js";
import { validator } from "./utils/validator.js";

const $digits = document.querySelector('.digits');
const $modifier = document.querySelector('.modifier');
const $operations = document.querySelector('.operations');
const $total = document.querySelector('#total');

const calculator = new Calculator();

$digits.addEventListener('click', onClickNumber);
$operations.addEventListener('click', onClickOperation);
$modifier.addEventListener('click', onClickClear);

function onClickNumber(event){
  const selectNumber = event.target.innerText;
  const targetNumber = !calculator.operation ? calculator.number1 : calculator.number2;
  
  const updateNumber = parseInt(targetNumber + selectNumber,10);
  if(!validator(updateNumber)){
    alert('숫자는 3자리 까지 입력 할 수 있습니다.');
    return;
  }

  if(calculator.operation){
    calculator.number2 = updateNumber;
  }else {
    calculator.number1 = updateNumber;
  }
  
  calculator.setTotal(selectNumber);
  updateTotal();
}

function onClickOperation(event){
  const selectOperation = event.target.innerText;
  if(selectOperation === '='){
    calculate();
    return;
  }

  if(!calculator.number1 || calculator.operation){
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요.');
    return;
  }
  calculator.operation = selectOperation;
  calculator.setTotal(selectOperation);
  updateTotal();
}

function updateTotal(){
  $total.innerText = calculator.total;
}

function onClickClear(){
  calculator.clear();
  updateTotal();
}

function calculate(){
  if(!calculator.number1 || !calculator.number2){
    return;
  }
  let result;
  switch(calculator.operation) {
    case '+':  
       result = calculator.add();
      break;
    case '-':  
      result = calculator.subtract();
      break;
    case 'X':
      result = calculator.multiply();
      break;
    case '/':
      result = calculator.division();
  }
  calculator.setResult(result);
  updateTotal();
}
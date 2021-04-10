const digit = document.querySelectorAll('.digits > .digit');
const total = document.querySelector('#total');
const modifier = document.querySelector('.modifiers > .modifier');
const operation = document.querySelectorAll('.operations > .operation');
let saveValue = '',oper,result;

const digitEventHandler = (digitElement)=>{
  if(saveValue.split(oper)[1] == undefined)
      checkFirstValue(digitElement);
  else
    checkLastValue(digitElement);
}

const modifyEventHandler = ()=>{
  total.innerHTML = 0;
  saveValue = '';
}

const operationEventListener = (i)=> {
  if (Number.isNaN(Number(saveValue)))
    alert('연속된 사칙연산은 입력할 수 없어');
  else {
    oper = operation[i].innerHTML;
    total.innerHTML = saveValue.concat(operation[i].innerHTML);
    saveValue = total.innerHTML;
  }
}

const calculateEventListener = ()=>{
  if(oper == 'X')
    result = Math.floor(saveValue.split(oper)[0] * saveValue.split(oper)[1]);
  else if(oper == '/')
    result = Math.floor(saveValue.split(oper)[0] / saveValue.split(oper)[1]);
  else if(oper == '+')
    result = Number(saveValue.split(oper)[0]) + Number(saveValue.split(oper)[1]);
  else if(oper == '-')
    result = saveValue.split(oper)[0] - saveValue.split(oper)[1];
  total.innerHTML = result;
  saveValue ='';
}

const checkFirstValue = (digitElement)=>{
  if(saveValue.split(oper)[0].length == 3)
    alert('세자리 초과는 못해');
  else{
    total.innerHTML = saveValue.concat(digitElement.innerHTML);
    saveValue = total.innerHTML;
  }
}

const checkLastValue = (digitElement)=>{
  if(saveValue.split(oper)[1].length==3)
    alert('세자리 초과는 못해');
  else{
    total.innerHTML = saveValue.concat(digitElement.innerHTML);
    saveValue = total.innerHTML;
  }
}

for(let digitElement of digit)
  digitElement.addEventListener('click',()=>digitEventHandler(digitElement))

modifier.addEventListener('click',modifyEventHandler)

for(let i=0;i<operation.length-1;i++)
  operation[i].addEventListener('click',()=>operationEventListener(i))

operation[4].addEventListener('click',calculateEventListener)


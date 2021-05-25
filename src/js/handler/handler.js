import {checkFirstValue, checkLastValue} from "../check/check.js";

const digitEventHandler = (digitElement,saveValue,oper,total)=>{
  if(saveValue.split(oper)[1] == undefined)
    [saveValue,oper] = checkFirstValue(digitElement,saveValue,oper,total);
  else
    [saveValue,oper] = checkLastValue(digitElement,saveValue,oper,total);
  return [saveValue,oper];
}

const modifyEventHandler = (saveValue,total)=>{
  total.innerHTML = 0;
  saveValue = '';
  return [saveValue]
}

const operationEventListener = (i,oper,operation,total,saveValue)=> {
  if (Number.isNaN(Number(saveValue)))
    alert('연속된 사칙연산은 입력할 수 없어');
  else {
    oper = operation[i].innerHTML;
    total.innerHTML = saveValue.concat(operation[i].innerHTML);
    saveValue = total.innerHTML;
  }
  return [oper,saveValue];
}

const calculateEventListener = (saveValue,result,oper,total)=>{
  const firstValue = saveValue.split(oper)[0], secondValue = saveValue.split(oper)[1]
  switch(oper){
    case 'X':
      result = Math.floor(firstValue * secondValue);
      break;
    case '/':
      result = Math.floor(firstValue / secondValue);
      break;
    case '+':
      result = Number(firstValue) + Number(secondValue);
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    default:
      alert('ERROR');
  }

  total.innerHTML = result;
  saveValue ='';
  return [saveValue,result,oper];
}



export {digitEventHandler,modifyEventHandler,operationEventListener,calculateEventListener};

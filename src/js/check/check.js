
const checkFirstValue = (digitElement,saveValue,oper,total)=>{
  if(saveValue.split(oper)[0].length == 3)
    alert('숫자는 최대 세자리까지만 입력 가능합니다.');
  else{
    total.innerHTML = saveValue.concat(digitElement.innerHTML);
    saveValue = total.innerHTML;
  }
  return [saveValue,oper];
}

const checkLastValue = (digitElement,saveValue,oper,total)=>{
  if(saveValue.split(oper)[1].length==3)
    alert('세자리 초과는 못해');
  else{
    total.innerHTML = saveValue.concat(digitElement.innerHTML);
    saveValue = total.innerHTML;
  }
  return [saveValue,oper];
}

export {checkLastValue,checkFirstValue}

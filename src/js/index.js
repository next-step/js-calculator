import {digitEventHandler,modifyEventHandler,operationEventListener,calculateEventListener} from "./handler/handler.js";
import {digit,total,modifier,operation} from "./source/source.js";

let saveValue = '',oper,result;

for(let digitElement of digit)
  digitElement.addEventListener('click',()=>[saveValue,oper] = digitEventHandler(digitElement,saveValue,oper,total))

modifier.addEventListener('click',() =>[saveValue]= modifyEventHandler(saveValue,total))

for(let i=0;i<operation.length-1;i++)
  operation[i].addEventListener('click',()=> [oper,saveValue]=operationEventListener(i,oper,operation,total,saveValue))

operation[4].addEventListener('click',()=> [saveValue,result,oper]=calculateEventListener(saveValue,result,oper,total))


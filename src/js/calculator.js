import {MESSAGE} from "./constant.js";
  
const $view = document.getElementById('total');
let nowText = '';
let txtSplit = [];//[첫번째 숫자, 연산자, 두번째 숫자]


//텍스트를 split해 줌
const initNowNum = function(){
    nowText = $view.innerText;
    txtSplit = nowText.split(/(\+|-|X|\/)+/g);
    if(txtSplit && txtSplit[0] == '0') txtSplit = [];
}

//계산, 처음엔 eval을 사용했으나 eval 문제점으로 변경
const calculate = function(first, op, second){
    first = Number(first);
    second = Number(second);
    switch(op){
        default: return;
        case '+': return (Math.floor(first + second));
        case '-': return (Math.floor(first - second));
        case 'X': return (Math.floor(first * second));
        case '/': return (Math.floor(first / second));
    }
}

export const onClickDigit = (event)=>{
    initNowNum()
    //숫자가 이미 3자리일 때 오류
    if(!txtSplit[1] && txtSplit[0] && txtSplit[0].length>=3){
        return alert(MESSAGE.ERR_MAX_DIGIT);
    }
    if(txtSplit[1] && txtSplit[2] && txtSplit[2].length>=3){
        return alert(MESSAGE.ERR_MAX_DIGIT);
    }
    $view.innerText = nowText === '0' ? 
    event.target.innerText : nowText + event.target.innerText;
}

export const onClickOperator = (event)=>{
    initNowNum();
    switch(event.target.innerText){
        default: return alert(MESSAGE.ERR_UNEXPECTED)
        case '+':
        case '-':
        case 'X':
        case '/':
            //숫자를 입력하기 전에 연산자를 입력했을 때 오류
            //연산자가 이미 있을 때 오류
            if(!txtSplit[0] || txtSplit[1]){
                return alert(MESSAGE.ERR_OP_WITHOUT_NUM)
            }
            $view.innerText = nowText + event.target.innerText;
            break;  
        case '=':
            //second가 없을 때 오류
            let result = calculate(txtSplit[0], txtSplit[1], txtSplit[2]);
            if(!txtSplit[2]){
                return alert(MESSAGE.ERR_CAL_WITHOUT_NUM);
            }
            if(isNaN(Number(result))){
                return alert(MESSAGE.ERR_UNEXPECTED);
            }
            $view.innerText = (result);
            break;
    }
}

export const onClickModifier = (event)=>{
    switch(event.target.innerText){
        default:
            break;
        case 'AC':
            $view.innerText = '0';
            break; 
    }
}
import {CONSTANTS} from '../../comm/constants.js'
export class CalculatorData{
    static INIT_DIGIT = 0
    static UNSELECTED = NaN;

    constructor(){
        this.digitSlot1 = CalculatorData.INIT_DIGIT;
        this.middleResultSlot = CalculatorData.INIT_DIGIT;
        this.operatorSlot = '';
        this.digitSlot2 = CalculatorData.UNSELECTED;
    }

    isValidDigit(digits){
        return String(digits).length <= CONSTANTS.DIGIT_MAX_LENGTH
    }

    setDigitSlot1(digits){
        if(!this.isValidDigit(digits)){
            alert("숫자는 3자리까지만 입력이 가능합니다.");
            return;
        }
        this.digitSlot1 = Number(digits);
    }
    setOperatorSlot(operator){
        this.operatorSlot = operator;
    }
    setDigitSlot2(digits){
        if(!this.isValidDigit(digits)){
            alert("숫자는 3자리까지만 입력이 가능합니다.");
            return;
        }
        this.digitSlot2 = Number(digits);
    }
    setMiddleResultSlot(digits){
        this.middleResultSlot = Number(digits);
    }

    getDigitSlot1(){
        return this.digitSlot1;
    }
    getOperatorSlot(){
        return this.operatorSlot;
    }
    getDigitSlot2(){
        return this.digitSlot2;
    }
    getMiddleResultSlot(){
        return this.middleResultSlot;
    }
    toString(){
        const digit1 =  `${this.middleResultSlot !== 0 ? this.middleResultSlot:this.digitSlot1}`;
        const operator = `${this.operatorSlot}`;
        const digit2 = `${isNaN(this.digitSlot2) ? '':this.digitSlot2}`;
        if(!isFinite(this.middleResultSlot)){
            return '0으로 나눌 수 없습니다.';
        }
        return `${digit1}${operator}${digit2}`
    }
}
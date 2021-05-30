import {CalculatingState} from './CalculatingState.js';
import {CalculatorData} from '../data/CalculatorData.js';

const InitState = {
    _checkState : (calculator) => {
        const beforeData = calculator.getData();
        const isValid =  isNaN(beforeData.getDigitSlot2()) && beforeData.getMiddleResultSlot() === 0;
        if(!isValid) throw new Error('Not Allowed State');
    },
    makingDataByDigitInput : (calculator,digit) => {
        InitState._checkState(calculator);
        const data = calculator.getData();
        data.setDigitSlot1(data.getDigitSlot1() + digit);
        return data;
    },
    makingDataByOperatorInput : (calculator,operator) => {
        InitState._checkState(calculator);
        const data = calculator.getData();
        if(data.getDigitSlot1() === CalculatorData.INIT_DIGIT) {
            alert("숫자를 먼저 입력해 주세요.")
            return data;
        }
        data.setOperatorSlot(operator);
        data.setMiddleResultSlot(data.getDigitSlot1());
        
        calculator.state = CalculatingState;
        return data;
        
    },
    makingDataByModifierInput : (calculator) => {
        InitState._checkState(calculator);
        return new CalculatorData();
    },
    makingDataByEqualOperatorInput : (calculator) => {
        InitState._checkState(calculator);
        const data = calculator.getData();
        return data;
    }
}
export {InitState};
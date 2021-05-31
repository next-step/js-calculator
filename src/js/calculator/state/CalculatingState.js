import { InitState } from './InitState.js';
import { CalculatorData } from '../data/CalculatorData.js';
import { OPERATORS } from '../../comm/constants.js';

const CalculatingState = {
    _checkState: (calculator) => {
        const beforeData = calculator.getData();
        const isValid = beforeData.getMiddleResultSlot() !== '';
        if (!isValid) throw new Error('Not Allowed State');
    },
    makingDataByDigitInput: (calculator, digit) => {
        CalculatingState._checkState(calculator);
        const data = calculator.getData();
        if (data.getOperatorSlot() === '') {
            alert('연산자를 먼저 입력해 주세요.');
            return data;
        }

        if (isNaN(data.getDigitSlot2())) {
            data.setDigitSlot2(CalculatorData.INIT_DIGIT);
        }
        data.setDigitSlot2(data.getDigitSlot2() + digit);
        return data;
    },
    makingDataByOperatorInput: (calculator, operator) => {
        CalculatingState._checkState(calculator);
        const data = calculator.getData();
        const beforeOperator = data.getOperatorSlot();
        if (beforeOperator !== '' && !isNaN(data.getDigitSlot2())) {
            data.setMiddleResultSlot(CalculatingState._operation(data));
            data.setDigitSlot1(CalculatorData.INIT_DIGIT);
            data.setDigitSlot2(CalculatorData.UNSELECTED);
        }
        data.setOperatorSlot(operator);
        return data;
    },
    makingDataByModifierInput: (calculator) => {
        CalculatingState._checkState(calculator);
        calculator.state = InitState;
        return new CalculatorData();
    },
    makingDataByEqualOperatorInput: (calculator) => {
        CalculatingState._checkState(calculator);
        const data = calculator.getData();
        const beforeOperator = data.getOperatorSlot();
        if (beforeOperator !== '' && !isNaN(data.getDigitSlot2())) {
            data.setMiddleResultSlot(CalculatingState._operation(data));
            data.setDigitSlot1(CalculatorData.INIT_DIGIT);
            data.setOperatorSlot('');
            data.setDigitSlot2(CalculatorData.UNSELECTED);
        }
        return data;
    },
    _operation: (data) => {
        const num1 = data.getMiddleResultSlot();
        const num2 = data.getDigitSlot2();
        const operator = data.getOperatorSlot();
        switch (operator) {
            case OPERATORS.MULTIPLE:
                return num1 * num2;
            case OPERATORS.PLUS:
                return num1 + num2;
            case OPERATORS.MINUS:
                return num1 - num2;
            case OPERATORS.DIVIDE:
                return Math.floor(num1 / num2);
        }
    },
};
export { CalculatingState };

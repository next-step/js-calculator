import Modifiers from '../components/Modifiers.js';
import Digits from '../components/Digits.js';
import Operations from '../components/Operations.js';
import { isOperandFirst, isOperandFull } from '../common/validations.js';
import { calculate, formatOperand } from '../common/utils.js';

const initialState = {
    total: '0',
    leftOperand: '0',
    rightOperand: null,
    operation: null,
};
class Calculator {
    constructor() {
        this.state = initialState;
        this.$digits = document.querySelector('div.digits');
        this.$modifiers = document.querySelector('div.modifiers');
        this.$operations = document.querySelector('div.operations');
        this.$total = document.querySelector('#total');
        this.initializeComponents();
    }

    updateOperand(digit) {
        const { state } = this;
        const { operation } = state;
        let { leftOperand, rightOperand } = state;

        if (!operation) {
            leftOperand = formatOperand(leftOperand, digit);
        } else {
            rightOperand = formatOperand(rightOperand, digit);
        }

        const total = operation
            ? leftOperand + operation + rightOperand
            : leftOperand;

        this.setState({
            ...state,
            total,
            leftOperand,
            rightOperand,
        });
    }

    setOperation(operation) {
        const { state } = this;

        if (isOperandFirst(state.leftOperand)) return;

        if (operation === '=') {
            const total = calculate(state);
            this.setState({
                total,
                leftOperand: total,
                rightOperand: null,
                operation: null,
            });
            return;
        }

        if (isOperandFull(state.rightOperand)) return;

        this.setState({
            ...state,
            total: state.leftOperand + operation,
            operation,
        });
    }

    resetState() {
        this.setState(initialState);
    }

    initializeComponents() {
        new Digits({
            $target: this.$digits,
            updateOperand: this.updateOperand.bind(this),
        });

        new Modifiers({
            $target: this.$modifiers,
            resetState: this.resetState.bind(this),
        });

        new Operations({
            $target: this.$operations,
            setOperation: this.setOperation.bind(this),
        });
    }

    setState(newState) {
        this.state = newState;

        this.render();
    }

    render() {
        this.$total.textContent = this.state.total;
    }
}

export default Calculator;

import Modifiers from '../components/Modifiers.js';
import Digits from '../components/Digits.js';
import Operations from '../components/Operations.js';
import {
    isOperandFirst,
    isMaxLength,
    isOperandFull,
} from '../common/validations.js';
import { calculate } from '../common/utils.js';

/**
 * @typedef {object} IState
 * @prop {string} total
 * @prop {string} leftOperand
 * @prop {string | null} rightOperand
 * @prop {string | null} operation
 */

/**
 * @typedef {object} IProps
 * @prop {IState} initialState
 */

/**
 * @param {IProps} props
 */
function Calculator({ initialState }) {
    this.state = initialState;
    this.$digits = document.querySelector('div.digits');
    this.$modifiers = document.querySelector('div.modifiers');
    this.$operations = document.querySelector('div.operations');
    this.$total = document.querySelector('#total');

    this.updateOperand = (digit) => {
        const { operation } = this.state;
        let { leftOperand, rightOperand } = this.state;

        if (!operation) {
            if (isMaxLength(leftOperand)) return;

            if (leftOperand === '0') {
                leftOperand = digit;
            } else {
                leftOperand = leftOperand + digit;
            }
        } else {
            if (rightOperand && isMaxLength(rightOperand)) return;

            if (rightOperand === '0' || !rightOperand) {
                rightOperand = digit;
            } else {
                rightOperand = rightOperand + digit;
            }
        }

        const total = operation
            ? leftOperand + operation + rightOperand
            : leftOperand;

        this.setState({
            ...this.state,
            total,
            leftOperand,
            rightOperand,
        });
    };

    new Digits({ $target: this.$digits, updateOperand: this.updateOperand });

    this.resetState = () => {
        this.setState(initialState);
    };

    new Modifiers({ $target: this.$modifiers, resetState: this.resetState });

    this.setOperation = (operation) => {
        let total;

        if (isOperandFirst(this.state.leftOperand)) return;

        if (operation === '=') {
            total = calculate(this.state);
            this.setState({
                ...this.state,
                total,
                leftOperand: total,
                rightOperand: null,
                operation: null,
            });
            return;
        }

        if (isOperandFull(this.state.rightOperand)) return;

        total = this.state.leftOperand + operation;
        this.setState({
            ...this.state,
            total,
            operation,
        });
    };

    new Operations({
        $target: this.$operations,
        setOperation: this.setOperation,
    });

    this.setState = (newState) => {
        this.state = newState;

        this.render();
    };

    this.render = () => {
        this.$total.textContent = this.state.total;
    };
}

export default Calculator;

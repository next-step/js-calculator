import { CALCULATE } from './constants.js';
import { isMaxLength } from './validations.js';

/**
 * @typedef {object} IData
 * @prop {string} total
 * @prop {string} leftOperand
 * @prop {string | null} rightOperand
 * @prop {string | null} operation
 */

/**
 * @param {IData} data
 */
export function calculate(data) {
    const { leftOperand, operation } = data;
    const rightOperand = data.rightOperand ? data.rightOperand : leftOperand;

    return operation
        ? CALCULATE[operation](leftOperand, rightOperand)
        : leftOperand;
}

export function formatOperand(operand, digit) {
    if (!operand) return digit;

    if (isMaxLength(operand, 3)) return;

    return `${Number(operand + digit)}`;
}

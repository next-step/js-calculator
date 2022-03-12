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

    let calculatedValue;

    switch (operation) {
        case '/':
            calculatedValue = Math.floor(+leftOperand / +rightOperand);
            break;
        case 'X':
            calculatedValue = +leftOperand * +rightOperand;
            break;
        case '-':
            calculatedValue = +leftOperand - +rightOperand;
            break;
        case '+':
            calculatedValue = +leftOperand + +rightOperand;
            break;
        default:
            calculatedValue = leftOperand;
    }

    return calculatedValue + '';
}

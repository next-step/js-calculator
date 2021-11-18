import { CONSTANTS, MESSAGES } from './constants.js';

export const calculate = (firstNumber, operator, secondNumber) => {
	let result = 0;
	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);

	switch (operator) {
		case CONSTANTS.PLUS:
			result = firstNumber + secondNumber;
			break;
		case CONSTANTS.MINUS:
			result = firstNumber - secondNumber;
			break;
		case CONSTANTS.MULTIPLY:
			result = firstNumber * secondNumber;
			break;
		case CONSTANTS.DIVISION:
			result = (firstNumber / secondNumber) >> 0;
			break;
		default:
			alert(MESSAGES.OPERATOR_ERROR);
	}

	return result;
};

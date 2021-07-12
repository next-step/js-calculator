import { MAX_DIGIT_LENGTH, DEFAULT_TOTAL_VALUE, REGULAR_EXPRESSION } from './constants.js';

export const isMaxDigitLength = () => {
	const totalValue = document.querySelector('#total').textContent;
	const operatorUnit = totalValue.split('').find((unit) => REGULAR_EXPRESSION.test(unit));

	return !operatorUnit
		? totalValue.length < MAX_DIGIT_LENGTH
		: totalValue.split(operatorUnit)[1].length < MAX_DIGIT_LENGTH;
};

export const isArithmeticOperator = () => {
	const totalValue = document.querySelector('#total').textContent;

	return totalValue === DEFAULT_TOTAL_VALUE
		? false
		: !Number.isNaN(+totalValue[totalValue.length - 1]);
};

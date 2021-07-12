import { isMaxDigitLength, isArithmeticOperator } from './validator.js';
import { DEFAULT_TOTAL_VALUE, REGULAR_EXPRESSION, OPERATORS, MESSAGES } from './constants.js';

const total = document.querySelector('#total');

export function onNumberClick(event) {
	const targetNumber = event.target.textContent;

	if (!isMaxDigitLength()) return alert(MESSAGES.ERROR100);

	return total.textContent === DEFAULT_TOTAL_VALUE
		? (total.textContent = targetNumber)
		: (total.textContent += targetNumber);
}

export function onOperatorClick(event) {
	const targetOperator = event.target.textContent;

	if (targetOperator === OPERATORS.EQUAL) return;
	if (!isArithmeticOperator()) return alert(MESSAGES.ERROR101);

	return (total.textContent += targetOperator);
}

export function onResetClick() {
	total.textContent = DEFAULT_TOTAL_VALUE;
}

export function onEqualClick() {
	const totalString = total.textContent;
	const operator = totalString.split('').find((elem) => REGULAR_EXPRESSION.test(elem));
	const calcNumbers = totalString.split(operator);

	const calculator = {
		[OPERATORS.PLUS]: (left, right) => left + right,
		[OPERATORS.MINUS]: (left, right) => left - right,
		[OPERATORS.MULTIPLE]: (left, right) => left * right,
		[OPERATORS.DIVISION]: (left, right) => Math.floor(left / right),
	};

	if (calcNumbers.length === 1) return;

	total.textContent = calculator[operator](+calcNumbers[0], +calcNumbers[1]);
}

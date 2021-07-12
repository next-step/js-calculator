import {DIGIT_REGEX, EMPTY_VALUE, MAX_LENGTH, OPERATIONS_REGEX} from './constant';

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiple = (a, b) => a * b;
const divide = (a, b) => a / b;

const isDigit = (value) => DIGIT_REGEX.test(value);

export const calMapper = {
	x: multiple,
	X: multiple,
	'-': substract,
	'+': add,
	'/': divide,
};

export const parseTotal = ($total) => {
	if (!hasOperation($total)) {
		return {a: EMPTY_VALUE, operation: EMPTY_VALUE, b: $total.innerHTML};
	}
	const operation = $total.innerHTML.match(OPERATIONS_REGEX)[0];
	const [a, b] = $total.innerHTML.split(OPERATIONS_REGEX);
	return {a, operation, b};
};

export const isDigitValid = ($total) => {
	const {b} = parseTotal($total);
	return !b || b.length < MAX_LENGTH;
};
export const hasOperation = ($total) => {
	return OPERATIONS_REGEX.test($total.innerHTML);
};

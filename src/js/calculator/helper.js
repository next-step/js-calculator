const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiple = (a, b) => a * b;
const divide = (a, b) => a / b;

export const isDigit = (value) => /[0-9]/.test(value);

export const calMapper = {
	x: multiple,
	X: multiple,
	'-': substract,
	'+': add,
	'/': divide,
};

export const isDigitValid = ($total) => {
	const {b} = parseTotal($total);
	return !b || b.length < 3;
};
export const hasOperation = ($total) => {
	return /[\/X\-\+]/i.test($total.innerHTML);
};
export const parseTotal = ($total) => {
	if (!hasOperation($total)) {
		return {a: '', operation: '', b: $total.innerHTML};
	}
	const operation = $total.innerHTML.match(/[\/X\-\+]/i)[0];
	const [a, b] = $total.innerHTML.split(/[\/X\-\+]/i);
	return {a, operation, b};
};

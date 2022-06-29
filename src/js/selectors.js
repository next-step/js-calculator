export const CALCULATOR = '.calculator';
export const TOTAL = '#total';
export const DIGIT_WRAPPER = '.digits';
export const DIGIT = '.digit';
export const MODIFIER = '.modifier';
export const OPERATIONS = '.operations';
export const OPERATION = '.operation';
export const dataSelector = function (dataName, dataValue) {
	return `[data-${dataName}="${dataValue}"]`;
};

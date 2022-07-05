export const add = function (numA, numB) {
	return `${Number(numA) + Number(numB)}`;
};

export const minus = function (numA, numB) {
	return `${Number(numA) - Number(numB)}`;
};

export const multiply = function (numA, numB) {
	return `${Number(numA) * Number(numB)}`;
};

export const divide = function (numA, numB) {
	return `${Math.floor(Number(numA) / Number(numB))}`;
};

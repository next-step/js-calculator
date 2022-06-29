export const $ = function (selector) {
	return document.querySelector(selector);
};

export const $$ = function (selector) {
	return document.querySelectorAll(selector);
};

export const $ = function (selector) {
	return document.querySelector(selector);
};

export const $$ = function (selector) {
	return document.querySelectorAll(selector);
};

export const attachEvent = function (target, eventType, callback) {
		target.addEventListener(eventType, callback)
}
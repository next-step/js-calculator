import App from "./App.js";

new App({
	firstNumber: {
		isStart: false,
		isEnd: false,
		number: '',
		operator: '',
	},
	secondNumber: {
		isStart: false,
		number: '',
	},
	displayNumber: 0,
	$targetTotal: document.querySelector("#total"),
	$targetDigits: document.querySelector(".digits"),
	$targetModifier: document.querySelector(".modifiers"),
	$targetOperations: document.querySelector(".operations"),
});

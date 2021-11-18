import App from "./App.js";

new App({
	firstNumber: {
		isStart: false,
		isEnd: false,
		number: '',
		operator: '',
	},
	displayNumber: 0,
	$targetTotal: document.querySelector("#total"),
	$targetDisplay: document.querySelector("#id"),
	$targetDigits: document.querySelector(".digits"),
	$targetModifier: document.querySelector(".modifiers"),
	$targetOperations: document.querySelector(".operations"),
});

import App from "./App.js";
import { CONSTANTS } from './utils/constants.js';

new App({
	firstNumber: {
		isStart: false,
		isEnd: false,
		number: CONSTANTS.EMPTY_STRING,
		operator: CONSTANTS.EMPTY_STRING,
	},
	secondNumber: {
		isStart: false,
		number: CONSTANTS.EMPTY_STRING,
	},
	displayNumber: 0,
	$targetTotal: document.querySelector("#total"),
	$targetDigits: document.querySelector(".digits"),
	$targetModifier: document.querySelector(".modifiers"),
	$targetOperations: document.querySelector(".operations"),
});

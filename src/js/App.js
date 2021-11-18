import { calculate } from "./utils/calculate.js";
import { CONSTANTS, MESSAGES } from "./utils/constants.js";

export default class App {
	constructor({
		firstNumber,
		secondNumber,
		displayNumber,
		$targetTotal,
		$targetDigits,
		$targetModifier,
		$targetOperations,
	}) {
		this.firstNumber = firstNumber;
		this.secondNumber = secondNumber;
		this.displayNumber = displayNumber;
		this.$targetTotal = $targetTotal;
		this.$targetDigits = $targetDigits;
		this.$targetModifier = $targetModifier;
		this.$targetOperations = $targetOperations;

		this.$targetDigits.addEventListener(
			"click",
			({ target: { textContent } }) => {
				if (this.displayNumber.length === 3 && this.firstNumber.isStart) {
					alert(MESSAGES.DIGIT_ERROR);
					return;
				}
				if (!this.firstNumber.isStart) {
					this.displayNumber = textContent;
					this.$targetTotal.innerText = this.displayNumber;
					if (textContent === CONSTANTS.ZERO)
						this.displayNumber = CONSTANTS.EMPTY_STRING;
					this.firstNumber.isStart = true;
				} else {
					this.displayNumber += textContent;
					this.$targetTotal.innerText = this.displayNumber;
				}
				if (this.firstNumber.operator !== CONSTANTS.EMPTY_STRING) {
					this.secondNumber.isStart = true;
				}
			}
		);

		this.$targetModifier.addEventListener("click", () => {
			this.displayNumber = 0;
			this.$targetTotal.innerText = this.displayNumber;
			this.initialize();
		});

		this.$targetOperations.addEventListener("click", ({ target }) => {
			const { textContent } = target;
			if (
				textContent !== CONSTANTS.EQUALS &&
				this.firstNumber.isStart &&
				!this.secondNumber.isStart
			) {
				this.firstNumber.number = Number(this.displayNumber);
				this.firstNumber.operator = textContent;
				this.firstNumber.isStart = false;
				target.classList.add("selected");
			}
			if (
				this.firstNumber.operator !== CONSTANTS.EMPTY_STRING &&
				this.secondNumber.isStart &&
				textContent === CONSTANTS.EQUALS
			) {
				this.secondNumber.number = this.displayNumber;
				this.displayNumber = calculate(
					this.firstNumber.number,
					this.firstNumber.operator,
					this.secondNumber.number
				);
				this.$targetTotal.innerText = this.displayNumber;
				this.initialize();
			}
		});
	}
	initialize() {
		this.firstNumber = {
			isStart: false,
			number: CONSTANTS.EMPTY_STRING,
			operator: CONSTANTS.EMPTY_STRING,
		};
		this.secondNumber = {
			isStart: false,
			number: CONSTANTS.EMPTY_STRING,
		};
		this.$targetOperations
			.querySelector(".selected")
			.classList.remove("selected");
	}
}

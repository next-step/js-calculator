import { calculate } from "./utils/calculate.js";

export default class App {
	constructor({
		firstNumber,
		displayNumber,
		$targetTotal,
		$targetDisplay,
		$targetDigits,
		$targetModifier,
		$targetOperations,
	}) {
		this.firstNumber = firstNumber;
		this.displayNumber = displayNumber;
		this.$targetTotal = $targetTotal;
		this.$targetDisplay = $targetDisplay;
		this.$targetDigits = $targetDigits;
		this.$targetModifier = $targetModifier;
		this.$targetOperations = $targetOperations;

		this.$targetDigits.addEventListener(
			"click",
			({ target: { textContent } }) => {
				console.log(textContent);
				if (this.firstNumber.isEnd) {
					this.firstNumber = {
						isStart: false,
						isEnd: false,
						number: "",
						operator: "",
					};
					this.firstNumber.isEnd = false;
				}
				if (this.displayNumber.length === 3 && this.firstNumber.isStart) {
					alert("3자리이하만 입력가능합니다.");
					return;
				}
				if (!this.firstNumber.isStart) {
					this.displayNumber = textContent;
					this.$targetTotal.innerText = this.displayNumber;
					if (textContent === "0") this.displayNumber = "";
					this.firstNumber.isStart = true;
				} else {
					this.displayNumber += textContent;
					this.$targetTotal.innerText = this.displayNumber;
				}
			}
		);

		this.$targetModifier.addEventListener("click", ({ target }) => {
			console.log(target.textContent);
			this.displayNumber = 0;
			this.$targetTotal.innerText = this.displayNumber;
			this.firstNumber = {
				isStart: false,
				isEnd: false,
				number: "",
				operator: "",
			};
		});

		this.$targetOperations.addEventListener(
			"click",
			({ target: { textContent } }) => {
				console.log(textContent);
				if (textContent !== "=" && this.firstNumber.isStart) {
					this.firstNumber.number = Number(this.displayNumber);
					this.firstNumber.operator = textContent;
					this.firstNumber.isStart = false;
				}
				console.log(this.firstNumber);
				if (this.firstNumber.operator !== "" && textContent === "=") {
					console.log(this.displayNumber);
					this.displayNumber = calculate(
						this.firstNumber.number,
						this.firstNumber.operator,
						this.displayNumber
					);
					this.$targetTotal.innerText = this.displayNumber;
					this.firstNumber.isEnd = true;
				}
			}
		);
	}
}

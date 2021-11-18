import { calculate } from "./utils/calculate.js";

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
				if (this.firstNumber.operator !== "") {
					this.secondNumber.isStart = true;
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
			this.secondNumber = {
				isStart: false,
			};
			this.$targetOperations
				.querySelector(".selected")
				.classList.remove("selected");
		});

		this.$targetOperations.addEventListener("click", ({ target }) => {
			const { textContent } = target;
			console.log(target);
			console.log(textContent);
			if (
				textContent !== "=" &&
				this.firstNumber.isStart &&
				!this.secondNumber.isStart
			) {
				this.firstNumber.number = Number(this.displayNumber);
				this.firstNumber.operator = textContent;
				this.firstNumber.isStart = false;
				target.classList.add("selected");
			}
			console.log(this.firstNumber);
			if (
				this.firstNumber.operator !== "" &&
				this.secondNumber.isStart &&
				textContent === "="
			) {
				console.log(this.displayNumber);
				this.secondNumber.number = this.displayNumber;
				this.displayNumber = calculate(
					this.firstNumber.number,
					this.firstNumber.operator,
					this.secondNumber.number,
				);
				this.$targetTotal.innerText = this.displayNumber;
				this.firstNumber.isEnd = true;
				this.firstNumber = {
					isStart: false,
					isEnd: false,
					number: "",
					operator: "",
				};
				this.secondNumber = {
					isStart: false,
					number: '',
				};
				this.$targetOperations
					.querySelector(".selected")
					.classList.remove("selected");
				this.firstNumber.isEnd = false;
			}
		});
	}
}

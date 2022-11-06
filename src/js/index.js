import { $ } from "./utils";

class Calculator {
	showResult(result) {
		const total = $("#total");
		total.innerText = result;
	}

	setEventListener() {
		const digits = $(".digits");
		const operators = $(".operations");
		const allClearButton = $(".modifiers");

		digits.addEventListener("click", (e) =>
			console.log(e.target.closest(".digit").innerText)
		);

		operators.addEventListener("click", (e) => {
			const operator = e.target.closest(".operation").innerText;
			if (operator === "=") this.showResult(5);
		});

		allClearButton.addEventListener("click", (e) =>
			console.log(e.target.innerText)
		);
	}

	init() {
		this.setEventListener();
	}
}

const calculator = new Calculator();
calculator.init();

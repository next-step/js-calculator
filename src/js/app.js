import { $ } from "./utils.js";
import { calculator } from "./calculator.js";

const buttonTypeResultKeyMapper = {
	digit: "current",
	operator: "result",
	modifier: "result",
};

class App {
	total = $("#total");

	init() {
		this.setEventListener();
	}

	setEventListener() {
		const calculatorArea = $(".calculator");

		calculatorArea.addEventListener("click", (e) => {
			const buttons = e.target.closest("div");
			const { buttonType } = buttons.dataset;
			const buttonText = e.target.innerText;

			if (buttonType === "digit") this.handleClickDigit(buttonText);
			if (buttonType === "operator") this.handleClickOperator(buttonText);
			if (buttonType === "modifier") this.handleClickAC();

			this.showNumber(calculator[buttonTypeResultKeyMapper[buttonType]]);
		});
	}

	handleClickDigit(digit) {
		calculator.setDigit(digit);
	}

	handleClickOperator(operator) {
		calculator.calculate(operator);
	}

	handleClickAC() {
		calculator.allClear();
	}

	showNumber(number) {
		total.innerText = number;
	}
}

export default App;

import { $ } from "./utils.js";
import { calculator } from "./calculator.js";

const buttonTypeResultKeyMapper = {
	digit: "current",
	operation: "result",
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
			const buttonText = e.target.innerText;
			const currentButtonType = e.target.className;

			if (currentButtonType === "digit") this.handleClickDigit(buttonText);
			if (currentButtonType === "operation")
				this.handleClickOperator(buttonText);
			if (currentButtonType === "modifier") this.handleClickAC();

			this.showNumber(calculator[buttonTypeResultKeyMapper[currentButtonType]]);
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

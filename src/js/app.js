import { $ } from "./utils.js";
import { calculator } from "./calculator.js";

class App {
	total = $("#total");

	init() {
		this.setEventListener();
	}

	setEventListener() {
		const digits = $(".digits");
		const operators = $(".operations");
		const allClearButton = $(".modifiers");

		digits.addEventListener("click", (e) => {
			if (calculator.current.length === 3) {
				alert("3자리 이하의 수만 입력 가능합니다.");
				return;
			}

			const digit = e.target.closest(".digit").innerText;
			calculator.current += digit;
			this.showNumber(calculator.current);
		});

		operators.addEventListener("click", (e) => {
			const currentOperator = e.target.closest(".operation").innerText;

			if (currentOperator === "=") {
				switch (calculator.operator) {
					case "+":
						calculator.add();
						break;
					case "-":
						calculator.substract();
						break;
					case "X":
						calculator.multiply();
						break;
					case "/":
						calculator.divide();
						break;
				}
			} else {
				calculator.result = Number(calculator.current);
			}

			calculator.operator = currentOperator;
			calculator.current = "";
			this.showNumber(calculator.result);
		});

		allClearButton.addEventListener("click", () => {
			calculator.allClear();
			this.showNumber(calculator.result);
		});
	}

	showNumber(displayNumber) {
		total.innerText = displayNumber;
	}
}

export default App;

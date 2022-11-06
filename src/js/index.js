import { $ } from "./utils.js";

class Calculator {
	result = 0;
	current = "";
	operator = null;

	add() {
		this.result += Number(this.current);
	}

	substract() {
		this.result -= Number(this.current);
	}

	multiply() {
		this.result *= Number(this.current);
	}

	divide() {
		this.result = Math.floor(this.result / Number(this.current));
	}
}

const calculator = new Calculator();

const showResult = () => {
	const total = $("#total");
	total.innerText = calculator.result;
};

const showCurrentNumber = () => {
	const total = $("#total");
	total.innerText = calculator.current;
};

const setEventListener = () => {
	const digits = $(".digits");
	const operators = $(".operations");
	const allClearButton = $(".modifiers");

	digits.addEventListener("click", (e) => {
		const digit = e.target.closest(".digit").innerText;
		calculator.current += digit;
		showCurrentNumber();
	});

	operators.addEventListener("click", (e) => {
		const operator = e.target.closest(".operation").innerText;

		if (operator === "=") {
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

		calculator.operator = operator;
		calculator.current = "";
		showResult();
	});

	allClearButton.addEventListener("click", (e) =>
		console.log(e.target.innerText)
	);
};

const init = () => {
	setEventListener();
};

init();

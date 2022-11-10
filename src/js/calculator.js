import { MAX_LENGTH } from "./const.js";

const isOverMaxLength = (number) => String(number).length >= MAX_LENGTH;

const operates = {
	"+": (num1, num2) => num1 + num2,
	"-": (num1, num2) => num1 - num2,
	X: (num1, num2) => num1 * num2,
	"/": (num1, num2) => Math.floor(num1 / num2),
};

class Calculator {
	result = 0;
	current = 0;
	operator = "";

	allClear() {
		this.current = 0;
		this.result = 0;
		this.operator = "";
	}

	setDigit(digit) {
		if (isOverMaxLength(this.current)) {
			alert(`${MAX_LENGTH}자리 이하의 수만 입력 가능합니다.`);
			return;
		}
		this.current = Number(`${this.current}${digit}`);
	}

	calculate(currentOperator) {
		const operate = operates[calculator.operator];

		if (currentOperator === "=") {
			this.result = operate(this.result, this.current);
		} else {
			this.result = this.current;
		}

		this.current = 0;
		this.operator = currentOperator;
	}
}

export const calculator = new Calculator();

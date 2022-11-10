import { MAX_LENGTH } from "./const.js";

class Calculator {
	result = 0;
	current = 0;
	operator = "";

	calculate = {
		"+": () => this.add(),
		"-": () => this.substract(),
		X: () => this.multiply(),
		"/": () => this.divide(),
	};

	add() {
		this.result += this.current;
	}

	substract() {
		this.result -= this.current;
	}

	multiply() {
		this.result *= this.current;
	}

	divide() {
		this.result = Math.floor(this.result / this.current);
	}

	allClear() {
		this.current = 0;
		this.result = 0;
		this.operator = "";
	}

	pressDigit(digit) {
		if (isOverMaxLength(this.current)) return;
		this.current = Number(`${this.current}${digit}`);
	}

	pressOperator(currentOperator) {
		if (currentOperator === "=") {
			this.calculate[this.operator]();
			this.current = this.result;
		} else {
			this.result = this.current;
			this.current = 0;
		}

		this.operator = currentOperator;
	}
}

const isOverMaxLength = (number) => {
	if (String(number).length >= MAX_LENGTH) {
		alert(`${MAX_LENGTH}자리 이하의 수만 입력 가능합니다.`);
		return true;
	}
};

export const calculator = new Calculator();

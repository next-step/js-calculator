export const calculate = (firstNumber, operator, secondNumber) => {
	let result = 0;
	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);
	console.log(firstNumber, secondNumber);
	switch (operator) {
		case "+":
			result = firstNumber + secondNumber;
			break;
		case "-":
			result = firstNumber - secondNumber;
			break;
		case "X":
			result = firstNumber * secondNumber;
			break;
		case "/":
			result = (firstNumber / secondNumber) >> 0;
			break;
		default:
			console.log("해당 부호가 없습니다.");
	}

	return result;
};

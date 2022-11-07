
function operate(numberList, operator) {

	switch(operator) {
		case '+' :
			return plus(numberList)
		case '-' :
			return minus(numberList)
		case 'X' :
			return multiply(numberList)
		case '/' :
			return divide(numberList)       
	}
}


function plus(numberList) {     
	const result = String(parseInt(numberList[0]) + parseInt(numberList[1]))     
	document.getElementById('total').innerText = result

	return result
}

function minus(numberList) {
	const result = String(parseInt(numberList[0]) - parseInt(numberList[1]))
	document.getElementById('total').innerText = result

	return result
}
function multiply(numberList) {
	const result = String(parseInt(numberList[0]) * parseInt(numberList[1]))
	document.getElementById('total').innerText = result

	return result
}
function divide(numberList) {
	const result = String(Math.floor(parseInt(numberList[0]) / parseInt(numberList[1])))
	document.getElementById('total').innerText = result

	return result
}

export {operate}
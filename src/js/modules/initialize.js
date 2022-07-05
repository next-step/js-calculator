function init(number, currNumber, numberList, operators) {
	console.log('before is ', document.getElementById('total').innerText)
	number = '' //누적된 display number
	currNumber = '' //선택한 숫자
	numberList = []
	operators = []
	document.getElementById('total').innerText = 0
	console.log('after is ', document.getElementById('total').innerText)

	// return [number, currNumber, numberList, operators]
}

export {init}

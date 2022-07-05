
function clickNumbers(MAX_DIGITS_OF_NUMBERS, numberList, number, currNumber) {
	console.log('get into clicknumbers!!!')
	console.log('MAX_DIGITS_OF_NUMBERS is ', MAX_DIGITS_OF_NUMBERS)
	console.log('numberList is ', numberList)
	console.log('number is ', number)
	console.log('currNumber is ', currNumber)
	// alert(event.target.innerText)
	
	
	if(number.length <= MAX_DIGITS_OF_NUMBERS) {
		console.log('numberList.length is ', numberList.length)
		if(number === '0' || numberList.length > 0) {
			number = currNumber
		} else {
			number = number.concat(currNumber)
		}
		
		document.getElementById('total').innerText = number
	}
	return number
	
	
}

export {clickNumbers}
import {operate} from './operate.js'
import {OPERATOR} from './const.js'

function clickOperator(number, numberList, operators) {
	console.log('clickOperator is ', clickOperator)
	console.log('number = ', number, 'numberList = ', numberList, 'operators = ', operators)
	if(number !== '' && number !== 'NaN') {
		numberList.push(number)

	}

	// "="일때
	if(numberList.length === 2) {
		const result = operate(numberList, operators[0]) //operator : previous operator to avoid "=" operator
		if(operators[1] === OPERATOR.EQUAL) {
			operators = [] // equal이면 초기화
		}
		operators.shift() //remove first index ( or shift?)
		numberList = []
		numberList.push(result) //get a result number in numberList index 0
		console.log('operators after operating is ', operators)
	}
	return {numberList,operators}
}

export { clickOperator }

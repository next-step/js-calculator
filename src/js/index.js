import { clickOperator } from './modules/clickOperator.js';
import { MAX_DIGITS_OF_NUMBERS } from './modules/const.js';
import { clickNumbers } from './modules/clickNumber.js';
// import {init} from './modules/initialize.js'

let number = '' //누적된 display number
let currNumber = '' //선택한 숫자
let numberList = []
let operators = []



// number = clickNumbers(MAX_DIGITS_OF_NUMBERS, OPERATOR, currOperator, number);
// currOperator = clickOperator(number, numberList, currOperator);


document.querySelector('.digits').addEventListener('click', function(event){

	currNumber = event.target.innerText
	number = document.getElementById('total').innerText
	number = clickNumbers(MAX_DIGITS_OF_NUMBERS, numberList, number, currNumber)
	console.log('number after clickNumbers is ', number)
})

document.querySelector('.operations').addEventListener('click', function(event) {
	operators.push(event.target.innerText);

	numberList = clickOperator(number, numberList, operators)
	console.log('numberList is ', numberList, ' and operators = ', operators)
})

document.querySelector('.modifiers').addEventListener('click', function() {
	console.log('init before is -> number = ', number, 'currNumber = ', currNumber, 'numberList = ', numberList, 'operators = ', operators)
	
	// eslint-disable-next-line no-unexpected-multiline
	init()

	console.log('init after is -> number = ', number, 'currNumber = ', currNumber, 'numberList = ', numberList, 'operators = ', operators)
	
})

function init() {
	document.getElementById('total').innerText = 0
	number = '' //누적된 display number
	currNumber = '' //선택한 숫자
	numberList = []
	operators = []
}
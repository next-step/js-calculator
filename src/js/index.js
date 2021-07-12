import { $get, checkOnlyNum } from './utils.js'

window.addEventListener('DOMContentLoaded', init)

function init() {
	new Calculator()
}

class Calculator {
	constructor() {
		this.setElements()
		this.setEvents()
	}

	setElements() {
		this.$total = $get('#total')
		this.$digits = $get('.digits')
		this.$operations = $get('.operations')
	}

	setEvents() {
		this.$digits.addEventListener('click', (e) => {
			this.clickDigit(e)
		})

		this.$operations.addEventListener('click', (e) => {
			this.clickOperation(e)
		})
	}

	clickDigit(e) {
		const digit = e.target.closest('.digit').innerText

		if (this.$total.innerText === '0') {
			this.$total.innerText = digit
			return
		}

		this.$total.innerText += digit
	}

	clickOperation(e) {
		const operation = e.target.closest('.operation').innerText

		if (operation === '=') {
			this.calculate()
			return
		}

		if (!checkOnlyNum(this.$total.innerText)) return
		this.$total.innerText += operation
	}

	calculate() {
		this.$total.innerText = eval(this.$total.innerText)
	}
}

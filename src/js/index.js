import Calculator from './calculator.js';

const calculator = new Calculator()

const digitsEl = document.querySelectorAll('.digit');
const operationsEl = document.querySelectorAll('.operation:not(#equal)');
const equalEl = document.querySelector('#equal');
const displayEl = document.querySelector('#total');
const allClearEl = document.querySelector('.modifier');

digitsEl.forEach(element => {
    element.addEventListener('click', (e) => {
        calculator.insertOperand(e.target.innerText);
        displayEl.innerHTML = calculator.getDisplayText()
    })
});

operationsEl.forEach(element => {
    element.addEventListener('click', (e) => {
        calculator.insertOperator(e.target.innerText);
        displayEl.innerHTML = calculator.getDisplayText()
    })
});

allClearEl.addEventListener('click', () => {
    calculator.resetCalculator();
    displayEl.innerHTML = 0
})

equalEl.addEventListener('click', () => {
    const result = calculator.calculate();
    displayEl.innerHTML = result;

    calculator.resetCalculator();
})
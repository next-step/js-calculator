import { Calculator } from "./calculator.js";

window.onload = () => {
    const $selectors = {
        total: document.querySelector('#total'),
        modifiers: document.querySelector('.modifiers'),
        operations: document.querySelector('.operations'),
        digits: document.querySelector('.digits')
    }
    const calculator = new Calculator($selectors.total);

    function setEventListeners() {
        $selectors.modifiers.addEventListener('click', () => calculator.reset());
        $selectors.digits.addEventListener('click', e => calculator.insertDigit(e));
        $selectors.operations.addEventListener('click', e => calculator.insertOperator(e));
    }

    setEventListeners();
};
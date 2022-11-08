import { Calculator } from "./calculator.js";

window.onload = () => {
    const calculator = new Calculator({
        total: document.querySelector('#total'),
        modifiers: document.querySelector('.modifiers'),
        operations: document.querySelector('.operations'),
        digits: document.querySelector('.digits')
    });
};
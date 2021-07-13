import {onClickDigit, onClickOperator, onClickModifier} from './calculator.js';

const $digits = document.querySelectorAll('.digits button');
const $modifiers = document.querySelector('.modifiers');
const $operations = document.querySelector('.operations');

function initEventListeners(){
    console.log($digits);
    $digits.forEach((val)=>{
        val.addEventListener('click', onClickDigit);
    })
    $operations.addEventListener('click', onClickOperator);
    $modifiers.addEventListener('click', onClickModifier);
}

initEventListeners();
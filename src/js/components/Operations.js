import {OPERATOR} from '../consts/operator.js';

export function Operations({$el, onClickOperation}) {

    function render() {
        $el.innerHTML = `
            <button class="operation" data-operator="${OPERATOR.DIVIDE}">/</button>
            <button class="operation" data-operator="${OPERATOR.MULTIPLE}">X</button>
            <button class="operation" data-operator="${OPERATOR.MINUS}">-</button>
            <button class="operation" data-operator="${OPERATOR.PLUS}">+</button>
            <button class="operation" data-operator="${OPERATOR.EQUAL}">=</button>
        `;

        $el.addEventListener('click', ({target: {dataset: {operator}}}) => {
            onClickOperation({operator});
        });
    }

    render();
}

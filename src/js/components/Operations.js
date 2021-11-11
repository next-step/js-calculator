import {OPERATOR} from '../consts/operator.js';

export function Operations({$el, onClickOperation}) {

    function render() {
        $el.innerHTML = `
            <button class="operation" data-operator="${OPERATOR.DIVIDE}">/</button>
            <button class="operation" data-operator="${OPERATOR.MULTIPLE}">X</button>
            <button class="operation" data-operator="${OPERATOR.MINUS}">-</button>
            <button class="operation" data-operator="${OPERATOR.PLUS}" data-test="operator-plus">+</button>
            <button class="operation" data-operator="${OPERATOR.EQUAL}" data-test="operator-equal">=</button>
        `;

        $el.addEventListener('click', ({target: {dataset: {operator}}}) => {
            onClickOperation({operator});
        });
    }

    render();
}

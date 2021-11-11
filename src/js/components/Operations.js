export function Operations({$el, onClickOperation}) {

    function render() {
        $el.innerHTML = `
            <button class="operation">/</button>
            <button class="operation">X</button>
            <button class="operation">-</button>
            <button class="operation" data-test="operator-plus">+</button>
            <button class="operation" data-test="operator-equal">=</button>
        `;

        $el.addEventListener('click', ({target: {innerText}}) => {
            onClickOperation({operation: innerText});
        });
    }

    render();
}

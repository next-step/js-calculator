export default function Calculator({$el}) {

    const state = {
        enteredDigits: [],
        operation: '',
    };

    const render = () => {
        const displayNumber = getDisplayNumber(state.enteredDigits);

        $el.innerHTML = `
            <div class="calculator">
                <h1 id="total">${displayNumber}</h1>
                <div class="digits flex" data-click="digits">
                    <button class="digit" value="9">9</button>
                    <button class="digit" value="8">8</button>
                    <button class="digit" value="7">7</button>
                    <button class="digit" value="6">6</button>
                    <button class="digit" value="5">5</button>
                    <button class="digit" value="4">4</button>
                    <button class="digit" value="3">3</button>
                    <button class="digit" value="2">2</button>
                    <button class="digit" value="1">1</button>
                    <button class="digit" value="0">0</button>
                </div>
                <div class="modifiers subgrid" data-click="modifiers">
                    <button class="modifier">AC</button>
                </div>
                <div class="operations subgrid" data-click="operations">
                    <button class="operation">/</button>
                    <button class="operation">X</button>
                    <button class="operation">-</button>
                    <button class="operation">+</button>
                    <button class="operation">=</button>
                </div>
            </div>
        `;
    };

    const bindEvents = () => {
        $el.addEventListener('click', ({target}) => {
            if (target.closest('[data-click="digits"]')) {
                enterDigit(target.value);
            }
        });
    };

    const enterDigit = (digit) => {
        const {enteredDigits} = state;
        if (enteredDigits.length === 0) {
            enteredDigits.push(digit);
            render();
            return;
        }

        if (enteredDigits[enteredDigits.length - 1].length + 1 > 3) {
            alert('3자리를 초과할 수 없습니다.');
            return;
        }

        enteredDigits[enteredDigits.length - 1] += digit;
        render();
    };

    render();
    bindEvents();
}

const getDisplayNumber = (enteredDigits) => {
    if (enteredDigits.length === 0) {
        return 0;
    }

    return enteredDigits[enteredDigits.length - 1];
};

import {DIGIT, OPERATIONS} from './consts.js';

export default function Calculator({$el}) {

    /**
     * @type {{operation: string, enteredDigits: number[]}}
     */
    const state = {
        enteredDigits: [],
        operation: '',
    };

    const render = () => {
        const displayNumber = getDisplayNumber(state);

        $el.innerHTML = `
            <div class="calculator">
                <h1 id="total">${displayNumber}</h1>
                <div class="digits flex" data-click="digits">
                    <button class="digit" value="${DIGIT.NINE}">${DIGIT.NINE}</button>
                    <button class="digit" value="${DIGIT.EIGHT}">${DIGIT.EIGHT}</button>
                    <button class="digit" value="${DIGIT.SEVEN}">${DIGIT.SEVEN}</button>
                    <button class="digit" value="${DIGIT.SIX}">${DIGIT.SIX}</button>
                    <button class="digit" value="${DIGIT.FIVE}">${DIGIT.FIVE}</button>
                    <button class="digit" value="${DIGIT.FOUR}">${DIGIT.FOUR}</button>
                    <button class="digit" value="${DIGIT.THREE}">${DIGIT.THREE}</button>
                    <button class="digit" value="${DIGIT.TWO}">${DIGIT.TWO}</button>
                    <button class="digit" value="${DIGIT.ONE}">${DIGIT.ONE}</button>
                    <button class="digit" value="${DIGIT.ZERO}">${DIGIT.ZERO}</button>
                </div>
                <div class="modifiers subgrid" data-click="modifiers">
                    <button class="modifier">AC</button>
                </div>
                <div class="operations subgrid" data-click="operations">
                    <button class="operation" value="${OPERATIONS.DIVIDE}" data-cy="divide">${OPERATIONS.DIVIDE}</button>
                    <button class="operation" value="${OPERATIONS.MULTIPLY}" data-cy="multiply">${OPERATIONS.MULTIPLY}</button>
                    <button class="operation" value="${OPERATIONS.MINUS}" data-cy="minus">${OPERATIONS.MINUS}</button>
                    <button class="operation" value="${OPERATIONS.PLUS}" data-cy="plus">${OPERATIONS.PLUS}</button>
                    <button class="operation" value="${OPERATIONS.CALCULATE}" data-cy="calculate">${OPERATIONS.CALCULATE}</button>
                </div>
            </div>
        `;
    };

    const bindEvents = () => {
        $el.addEventListener('click', ({target}) => {
            if (target.closest('[data-click="digits"]')) {
                enterDigit(target.value);
            }

            if (target.closest('[data-click="modifiers"]')) {
                clearDigit();
            }

            if (target.closest('[data-click="operations"]')) {
                enterOperation(target.value);
            }
        });
    };

    const enterDigit = (digit) => {
        const {enteredDigits, operation} = state;

        const nowEnteredIndex = !operation ? 0 : 1;
        if (!enteredDigits[nowEnteredIndex]) {
            enteredDigits.push(0);
        }
        if (String(enteredDigits[nowEnteredIndex]).length > 2) {
            alert('3자리 숫자까지만 입력 가능합니다.');
            return;
        }
        enteredDigits[nowEnteredIndex] = parseInt(enteredDigits[nowEnteredIndex] + digit);
        render();
    };

    const clearDigit = () => {
        state.enteredDigits = [];
        state.operation = '';
        render();
    };

    const enterOperation = (operation) => {
        if (operation !== OPERATIONS.CALCULATE) {
            state.operation = operation;
            return;
        }
        if (!state.operation) {
            return;
        }

        try {
            state.enteredDigits = [computeOperation(state)];
        } catch ({message}) {
            alert(message);
            return;
        }
        state.operation = '';
        render();
    };

    const computeOperation = ({enteredDigits, operation}) => {
        const [first, second] = enteredDigits;

        switch (operation) {
            case OPERATIONS.DIVIDE:
                if (second === 0) {
                    throw new Error('0으로 나눌 수 없습니다.');
                }
                return Math.floor(first / second);
            case OPERATIONS.MULTIPLY:
                return first * second;
            case OPERATIONS.PLUS:
                return first + second;
            case OPERATIONS.MINUS:
                return first - second;
        }
    };


    /**
     * 화면에 표시되는 숫자
     * @param {array} enteredDigits
     * @returns {number|*}
     */
    const getDisplayNumber = ({enteredDigits, operation}) => {
        if (enteredDigits.length === 0) {
            return 0;
        }
        const nowEnteredIndex = !operation ? 0 : 1;
        return enteredDigits[nowEnteredIndex];
    };

    render();
    bindEvents();
}

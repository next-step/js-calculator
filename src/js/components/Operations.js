/**
 * @typedef {object} IProps
 * @prop {HTMLDivElement} $target
 * @prop {(operation: string) => void} setOperation
 */

/**
 * @param {IProps} props
 */
function Operations({ $target, setOperation }) {
    this.onClickOperation = (event) => {
        const $operation = event.target;
        const isOperation =
            $operation.classList.contains('operation') &&
            $operation instanceof HTMLButtonElement;

        if (!isOperation) return;

        const operation = $operation.textContent;

        setOperation(operation);
    };

    $target.addEventListener('click', this.onClickOperation);
}

export default Operations;

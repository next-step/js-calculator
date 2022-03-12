/**
 * @typedef {object} IProps
 * @prop {HTMLDivElement} $target
 * @prop {(digit: string) => void} updateOperand
 */

/**
 * @param {IProps} props
 */
function Digits({ $target, updateOperand }) {
    this.onClickDigit = (event) => {
        const $button = event.target;
        const isDigitButton =
            $button.classList.contains('digit') &&
            $button instanceof HTMLButtonElement;

        if (!isDigitButton) return;

        const digit = $button.textContent;

        updateOperand(digit);
    };

    $target.addEventListener('click', this.onClickDigit);
}

export default Digits;

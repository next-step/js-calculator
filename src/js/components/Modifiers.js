/**
 * @typedef {object} IProps
 * @prop {HTMLDivElement} $target
 * @prop {() => void} resetState
 */

/**
 * @param {IProps} props
 */
function Modifiers({ $target, resetState }) {
    this.handleClickModifier = (event) => {
        const $modifier = event.target;
        const isModifier =
            $modifier.classList.contains('modifier') &&
            $modifier instanceof HTMLButtonElement;

        if (!isModifier) return;

        resetState();
    };

    $target.addEventListener('click', this.handleClickModifier);
}

export default Modifiers;

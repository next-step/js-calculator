export function Modifier({$el, onClickModifier}) {

    function render() {
        $el.innerHTML = '<button class="modifier" data-test="modifier">AC</button>';

        $el.addEventListener('click', onClickModifier);
    }

    render();
}

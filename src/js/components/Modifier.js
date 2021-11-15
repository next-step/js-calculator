export function Modifier({$el, onClickModifier}) {

    function render() {
        $el.innerHTML = '<button class="modifier">AC</button>';

        $el.addEventListener('click', onClickModifier);
    }

    render();
}

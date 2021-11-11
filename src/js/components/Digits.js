export function Digits({$el, onClickDigit}) {

    function render() {
        $el.innerHTML = `
            <button class="digit">9</button>
            <button class="digit">8</button>
            <button class="digit" data-test="seven">7</button>
            <button class="digit" data-test="six">6</button>
            <button class="digit">5</button>
            <button class="digit">4</button>
            <button class="digit" data-test="three">3</button>
            <button class="digit">2</button>
            <button class="digit">1</button>
            <button class="digit">0</button> 
        `;

        $el.addEventListener('click', ({target: {innerText}}) => {
            onClickDigit({digit: Number(innerText)});
        });
    }

    render();
}

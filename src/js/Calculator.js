import {Digits} from './components/Digits.js';
import {Modifier} from './components/Modifier.js';
import {Operations} from './components/Operations.js';

export function Calculator({$el}) {

    const state = {
        prevNumber: 0,
        nextNumber: 0,
        operator: null,
    };

    function onClickDigit({digit}) {
        console.log(digit);
    }

    function onClickModifier() {
        state.prevNumber = 0;
        state.nextNumber = 0;
        state.operator = null;
    }

    function onClickOperation({operation}) {
        refreshTotal({totalText: state.prevNumber++});
    }

    function refreshTotal({totalText}) {
        $el.querySelector('#total').innerHTML = totalText;
    }

    function render() {
        $el.innerHTML = `
            <div class="calculator">
                <h1 id="total" data-test="total">0</h1>
                <div class="digits flex" data-component="digits"></div>
                <div class="modifiers subgrid" data-component="modifier"></div>
                <div class="operations subgrid" data-component="operations"></div>
            </div>
        `;

        new Digits({$el: $el.querySelector('[data-component="digits"]'), onClickDigit});
        new Modifier({$el: $el.querySelector('[data-component="modifier"]'), onClickModifier});
        new Operations({$el: $el.querySelector('[data-component="operations"]'), onClickOperation});
    }

    render();
}

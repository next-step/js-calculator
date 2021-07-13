import { CalculatorData } from './data/CalculatorData.js';
import { UI_COMPONENT, OPERATORS } from '../comm/constants.js';
import { Display } from './display/Display.js';

export class Calculator {
    constructor(state) {
        this.state = state;
        this.data = new CalculatorData();
        this.display = new Display();

        UI_COMPONENT.$digitsArea.addEventListener(
            'click',
            this.clickDigit.bind(this)
        );
        UI_COMPONENT.$operationsArea.addEventListener(
            'click',
            this.clickOperator.bind(this)
        );
        UI_COMPONENT.$modifiersArea.addEventListener(
            'click',
            this.clickAC.bind(this)
        );
    }
    setState(state) {
        this.state = state;
    }

    getData() {
        const copyData = new CalculatorData();
        copyData.setDigitSlot1(this.data.getDigitSlot1());
        copyData.setMiddleResultSlot(this.data.getMiddleResultSlot());
        copyData.setOperatorSlot(this.data.getOperatorSlot());
        copyData.setDigitSlot2(this.data.getDigitSlot2());

        return copyData;
    }

    clickDigit(event) {
        if (event.target.tagName === 'DIV') return;
        const digit = event.target.textContent;
        this.data = this.state.makingDataByDigitInput(this, digit);
        this._display();
    }

    clickOperator(event) {
        if (event.target.tagName === 'DIV') return;
        const operator = event.target.textContent;
        if (operator === OPERATORS.EQUAL) {
            this.data = this.state.makingDataByEqualOperatorInput(this);
        } else {
            this.data = this.state.makingDataByOperatorInput(this, operator);
        }

        this._display();
    }

    clickAC() {
        if (event.target.tagName === 'DIV') return;
        this.data = this.state.makingDataByModifierInput(this);
        this._display();
    }

    _display() {
        this.display.render(this.data);
    }
}

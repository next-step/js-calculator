import $ from '../utils/util.js';
import {DISPLAY, OPERATOR_ARR, OPERATOR_OBJ, MAX_NUMBERS_LENGTH} from '../constants/constants.js';
import NumberInput from './NumberInput.js';
import OperatorInput from './OperatorInput.js'
import Calculate from './Calculate.js';

export default class Calculator{
  constructor(targetElem) {
    this.$targetElem = $(targetElem);
    this.$targetElem.addEventListener('click', this.handleClickBtn.bind(this));

    this.numberInput = new NumberInput();
    this.operatorInput = new OperatorInput();
    this.calculateObj = new Calculate();
  }

  input(value) {
    if (isNaN(value)) {
      this.operatorInput.input(value);
      return;  
    }
    this.numberInput.input(value);
  }

  calculate() {
    this.calculateObj.calculate();
  }

  clearAll() {
    DISPLAY.innerText = '0';
  }

  handleClickBtn({target}) {
    const action = target.dataset.action;
    const targetValue = target.innerText;
    if (action) {
      this[action](targetValue);
    }
  }
}

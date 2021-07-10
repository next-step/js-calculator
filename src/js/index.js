const $ = (selector) => document.querySelector(selector);
const DISPLAY = $('#total');
const OPERATORS = ['+', '-', 'X', '/'];
const MAX_NUMBERS_LENGTH = 3;

class NumberInput{
  constructor() {
    this.currentValue = DISPLAY.innerText;
  }

  isValid() {
    const operator = [...this.currentValue].find(char => OPERATORS.includes(char))
    
    if (operator) {
      const splitedValues = this.currentValue.split(operator);
      return splitedValues[1].length < MAX_NUMBERS_LENGTH-1; 
    }

    return this.currentValue.length < MAX_NUMBERS_LENGTH-1;
  }

  input(num) {
    if (!this.isValid()) {
      return;
    }

    this.currentValue = DISPLAY.innerText;
    
    if (!(+this.currentValue)) {
      DISPLAY.innerText = num;
      return;
    }
    
    DISPLAY.innerText += num;
  }
}

class Calculator{
  constructor(target) {
    this.display = DISPLAY;
    this.$target = $(target);
    this.numberInput = new NumberInput();
    this.$target.addEventListener('click', this.handleClickBtn.bind(this))
  }

  input(value) {
    this.numberInput.input(value);
  }

  calculate() {

  }

  clearAll() {

  }

  handleClickBtn({target}) {
    const action = target.dataset.action;
    const targetValue = target.innerText;
    if (action) {
      this[action](targetValue);
    }
  }
}

new Calculator('.calculator');

const $ = (selector) => document.querySelector(selector);

const DISPLAY = $('#total');
const OPERATORS = ['+', '-', 'X', '/'];
const MAX_NUMBERS_LENGTH = 3;

class NumberInput {
  constructor() {
    this.currentValue = DISPLAY.innerText;
  }

  isValid() {
    this.currentValue = DISPLAY.innerText;
    const operator = [...this.currentValue]
                      .reverse()                                          
                      .find(char => OPERATORS.includes(char));
    
    if (operator) {
      const splitedValues = this.currentValue.split(operator);
      console.log(splitedValues[1].length < MAX_NUMBERS_LENGTH)
      return splitedValues[1].length < MAX_NUMBERS_LENGTH; 
    }

    return this.currentValue.length < MAX_NUMBERS_LENGTH;
  }

  input(num) {
    this.currentValue = DISPLAY.innerText;
    if (!this.isValid()) {
      return;
    }

    if (this.currentValue === '0') {
      DISPLAY.innerText = num;
      return;
    }
    
    DISPLAY.innerText += num;
  }
}

class OperatorInput {
  constructor() {
    this.currentValue = DISPLAY.innerText;
  }

  isValid() {
    this.currentValue = DISPLAY.innerText;
    const lastIndex = this.currentValue.length - 1;
    const lastChar = this.currentValue[lastIndex];

    return !isNaN(lastChar);
  }

  input(operator) {
    if (!this.isValid()) {
      return;
    }
    DISPLAY.innerText += operator;
  }
}

class Calculator{
  constructor(target) {
    this.display = DISPLAY;
    this.$target = $(target);
    this.numberInput = new NumberInput();
    this.operatorInput = new OperatorInput();

    this.$target.addEventListener('click', this.handleClickBtn.bind(this))
  }

  input(value) {
    if (isNaN(value)) {
      this.operatorInput.input(value);
      return;  
    }
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

const $ = (selector) => document.querySelector(selector);

const DISPLAY = $('#total');
const OPERATOR_OBJ = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  'X': (a, b) => a * b,
  '/': (a, b) => Math.floor(a / b),
}
const OPERATOR_ARR = Object.keys(OPERATOR_OBJ);

const MAX_NUMBERS_LENGTH = 3;

class NumberInput {
  isValid() {
    this.currentValue = DISPLAY.innerText;
    const operator = [...this.currentValue]
                      .reverse()                                          
                      .find(char => OPERATOR_ARR.includes(char));
    
    if (operator) {
      const splitedValues = this.currentValue.split(operator);
      console.log(splitedValues[1].length < MAX_NUMBERS_LENGTH)
      return splitedValues[1].length < MAX_NUMBERS_LENGTH; 
    }

    return this.currentValue.length < MAX_NUMBERS_LENGTH;
  }

  alertError() {
    if(this.isValid()) return;
    alert('숫자는 세 자리까지만 입력 가능합니다!');
  }

  input(num) {
    this.currentValue = DISPLAY.innerText;
    if (!this.isValid()) {
      this.alertError();
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
  isValid() {
    this.currentValue = DISPLAY.innerText;
    const lastIndex = this.currentValue.length - 1;
    const lastChar = this.currentValue[lastIndex];

    return !isNaN(lastChar) && this.currentValue !== '0';
  }

  alertError() {
    if (this.isValid()) return;
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
  }

  input(operator) {
    if (!this.isValid()) {
      this.alertError();
      return;
    }
    DISPLAY.innerText += operator;
  }
}

class Calculate{
  calculate() {
    this.currentValue = DISPLAY.innerText;
    const operators = [...this.currentValue].filter(char => OPERATOR_ARR.includes(char)); 
    const numbers = this.currentValue
                    .replace(/\D/g, '#')
                    .split('#')
                    .map(el => Number(el));

    const calculatedValue = numbers.reduce((result, number, index) => {
      if (index === 0) {
        return result + number;
      }
      const currOperator = operators[index-1];
      return OPERATOR_OBJ[currOperator](result, number);
    }, 0);

    DISPLAY.innerText = calculatedValue;
  }
}

class Calculator{
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

new Calculator('.calculator');
